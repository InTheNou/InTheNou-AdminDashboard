<template>
  <v-container
    class="grey lighten-5 mb-6"
    style="max-width: 600px;"
  >
    <v-row>
       <v-col cols="9">
          <v-select
            v-model="selectedBuilding"
            :rules="[ v => !!v]"
            :items="buildingsSelectList"
            label="Building*"
            outlined
            required
          >
          </v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="selectedFloor"
            :rules="[ v => v>=0]"
            :items="floorsSelectList"
            label="Floor*"
            outlined
            required
            >
          </v-select>
        </v-col>
    </v-row>
      <v-text-field
        v-model="search"
        label="Search"
        class="mb-5"
        prepend-inner-icon="mdi-magnify"
        flat
        single-line
        hide-details
      ></v-text-field>
    <v-card lass="justify-center">
      <v-card >
            <v-data-table
              :headers="headers"
              :items="roomsObjectsList"
              :search="search"
              class="elevation-1"
              max-heigth="500px"
             >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Rooms</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-form
                    ref="form"
                    v-model="valid"
                    class="ma-6"
                    lazy-validation
                  >
                  <v-dialog
                    v-model="dialog"
                    max-width="400px"
                  >
                    <v-card>
                      <v-card-title>
                        <span class="headline">
                          Edit Coordinates
                        </span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="4">
                              <v-text-field
                                v-model="roomObject.rlatitude"
                                label="Latitude"
                                :rules="rLatitudeRules"
                                required
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                v-model="roomObject.rlongitude"
                                label="Logitude"
                                :rules="rLongitudeRules"
                                required
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                v-model="roomObject.raltitude"
                                label="Altitude"
                                :rules="rAltitudeRules"
                                required
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                         text
                         :disabled="!valid"
                         @click="save"
                        >
                         Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  </v-form>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editRoomObject(item)"
                >
                  mdi-pencil
                </v-icon>
              </template>
            </v-data-table>
      </v-card>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    search: '',
    valid: false,
    dialog: false,
    buildingsSelectList: [], // List of buildings names in the system
    selectedBuilding: '', // building selected from buildingsSelectList
    floorsSelectList: [], // List of floors for a selected building
    selectedFloor: '', // floor selected from floorsSelectList
    selectedBuildingID: null, // ID of selected building
    selectedFloorID: null, // number of selected floor
    buildingObjectsList: [], // List holding building JSON objects of the system
    headers: // Table headers
    [
      { text: 'Room', align: 'start', value: 'rcode', sortable: true },
      { text: 'Latitude', value: 'rlatitude', sortable: false },
      { text: 'Longitude', value: 'rlongitude', sortable: false },
      { text: 'Altitude', value: 'raltitude', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    roomsObjectsList: [], // List holding room JSON objects of a selected floor
    editedRoomObjectIndex: -1, // Index of the room object being edit
    roomObject: // structure of the JSON room objects fo makin edits
    {
      photourl: '', // url of the room
      raltitude: 0, // room altitude coordinate
      rcode: '', // room code without building prefix
      rcustodian: '', // custodian of the room
      rdept: '', // department in charge of the room
      rdescription: '', // room description
      rfloor: 0, // floor where the room is located
      rid: 0, // room id in the backend
      rlatitude: 0, // room latitude coordinate
      rlongitude: 0, // room longitude coordinate
      roccupancy: 0 // room capacity
    },
    defalutRoomObject: // temporary structure of the JSON room objects holds original values before editing roomObject
    {
      photourl: '', // url of the room
      raltitude: 0, // room altitude coordinate
      rcode: '', // room code without building prefix
      rcustodian: '', // custodian of the room
      rdept: '', // department in charge of the room
      rdescription: '', // room description
      rfloor: 0, // floor where the room is located
      rid: 0, // room id in the backend
      rlatitude: 0, // room latitude coordinate
      rlongitude: 0, // room longitude coordinate
      roccupancy: 0 // room capacity
    },
    rLatitudeRules:
    [
      v => !!v || 'Latitude is required',
      v => /^((18)([.]?[0-9]{0,6}))$/.test(v) || 'latitude must be valid 18.######'
    ],
    rLongitudeRules:
    [
      v => !!v || 'Longitude is required',
      v => /^([-](67)([.]?[0-9]{0,6}))$/.test(v) || 'longitude must be valid -67.######'
    ],
    rAltitudeRules:
    [
      v => !!v || 'Altitude is required',
      v => /^([01]?[0-9]?[0-9]|200)(((\.)(\d+){1,3}))?$/.test(v) || 'Altitudee must be valid 0 - 200.######'
    ]
  }),
  /**
   *
   */
  async created () {
    await this.fetchBuildings() // once the component is created the fetchbuilding method is called
  },
  watch: {
    /**
     * watch for chanes in the selectedBuilding variable
     * if any changes occurs updates the floorsSelectlist array with the floors of the selected building
     */
    selectedBuilding: function () {
      this.floorsSelectList.length = 0
      for (var i = 0; i < this.buildingObjectsList.length; i++) {
        if (this.buildingObjectsList[i].bname === this.selectedBuilding) {
          for (var n = 0; n < this.buildingObjectsList[i].numfloors; n++) {
            this.selectedBuildingID = this.buildingObjectsList[i].bid
            this.floorsSelectList.push(this.buildingObjectsList[i].distinctfloors[n])
          }
        }
      }
    },
    /**
     * watch for changes in the selectedFloor variable
     * if any changes occurs calls the method fetchRooms() which updates the selectRoomsList
     */
    selectedFloor: async function () {
      this.selectedFloorID = this.selectedFloor
      await this.fetchRooms()
    },
    /**
     * watches for changes in dialog variable
     * if dialog is false calls method close()
     */
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    /**
     * validates the edit coordinates form using
     * the rules property in the v-text-field tags
     * if inputs are valid calls save method
     */
    validate: function () {
      this.$refs.form.validate()
      if (this.valid) {
        this.save()
      }
    },
    /**
     * opens the editc coordinates form when called
     * room : the room object being edited
     */
    editRoomObject (room) {
      this.editedRoomObjectIndex = this.roomsObjectsList.indexOf(room)
      this.roomObject = Object.assign({}, room)
      this.dialog = true
    },
    /**
     * close the edit coordinates dialog
     * restore any chnages to the roomObject
     * by interchanging it with the defaultRoomObject
     */
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.roomObject = Object.assign({}, this.defalutRoomObject)
        this.editedRoomObjectIndex = -1
      })
    },
    /**
     * commit changes to the backend once the function is called
     * uses POST method
     */
    save: async function () {
      if (this.editedRoomObjectIndex > -1) {
        await fetch(
          process.env.VUE_APP_API_HOST + process.env.VUE_APP_CHANGE_COORDINATES_1 + this.roomObject.rid + process.env.VUE_APP_CHANGE_COORDINATES_2,
          {
            method: 'POST',
            mode: 'cors',
            credential: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rlatitude: this.roomObject.rlatitude, rlongitude: this.roomObject.rlongitude, raltitude: this.roomObject.raltitude })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .catch((error) => {
            alert('There has been a problem with your fetch operation:', error)
          })
      }
      Object.assign(this.roomsObjectsList[this.editedRoomObjectIndex], this.roomObject)
      this.close()
    },
    /**
     * fetch List of buildings in the system
     *
     */
    fetchBuildings: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_BUILDINGS_1 + 0 + process.env.VUE_APP_BUILDINGS_2 + 1000)
        .then((response) => {
          return response.json()
        })
        .then((buildings) => {
          this.buildingObjectsList = buildings
        })
      for (var i = 0; i < this.buildingObjectsList.length; i++) {
        this.buildingsSelectList.push(this.buildingObjectsList[i].bname)
      }
    },
    /**
     * fetch list of rooms once a building and floor is selected
     */
    fetchRooms: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_FLOOR_ROOMS_1 + this.selectedBuildingID + process.env.VUE_APP_FLOOR_ROOMS_2 + this.selectedFloorID)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          this.roomsObjectsList = data.rooms
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    }
  }
}
</script>

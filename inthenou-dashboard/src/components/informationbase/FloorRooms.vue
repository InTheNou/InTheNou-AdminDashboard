<template>
<v-container class="pt-0" style="max-width: 600px;">
<v-row>
<!-- <v-layout row wrap align-center justify-center>
  <v-flex xs6 offset xs-1 sm6 offset-sm1 md6 offset-md1> -->
    <v-text-field
            v-model.lazy="search"
            flat
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Rooms..."
            class="pb-2"
          />
    <v-col cols="12" class="text-center">
      <h1>{{building.bname}}</h1>
    </v-col>
    <v-card >
      <v-container id="scroll-target" style="max-height: 700px" class="overflow-y-auto">
          <v-row  style="height: 500px"  >
            <v-list v-model="filteredRoomsList">
              <v-list-item v-if="noDataAvailable">
                <h2 class="text-center" style="height:100%; align:center;"> NO AVAILABLE  SERVICES AT THE MOMENT </h2>
              </v-list-item>
              <v-list-item
              v-else
              v-for="room in filteredRoomsList.rooms"
              :key="room.rid"
                @click="followRoute(buildingID, floorID, room.rid)" >
                    <v-list-item-content>
                    <v-divider> </v-divider>
                    <v-list-item-title>
                        Room: {{roomsList.building.babbrev}}-{{room.rcode}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Coordinates: ({{room.rlatitude}}, {{room.rlongitude}}, {{room.raltitude}})
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        Department: {{room.rdept}}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        Custodian: {{room.rcustodian}}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        Occupancy: {{room.roccupancy}}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        Description: {{room.rdescription}}
                      </v-list-item-subtitle>
                      </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-row>
        </v-container>
    </v-card>
    </v-row>
</v-container>
  <!-- </v-flex>
</v-layout> -->
</template>

<script>
export default {
  data: () => ({
    noDataAvailable: false,
    editCoorDialog: false,
    validCoordinates: false,
    formLongitudeInput: null,
    formLatitudeInput: null,
    formAltitudeInput: null,
    buildingID: null,
    floorID: null,
    roomID: null,
    savedLongitude: null,
    savedLatitude: null,
    savedAltitude: null,
    roomsList: [],
    filteredRoomsList: [],
    search: '',
    building: []
  }),
  // computed: {
  //   filteredRoomsList: function () {
  //     var newRoomsList = []
  //     if (this.search.length > 0) {
  //       for (var i = 0; i < this.roomsList.rooms.length; i++) {
  //         if (this.roomsList.rooms[i].rcode === this.search) {
  //           newRoomsList.push(this.roomsList.rooms[i])
  //         }
  //       }
  //       return newRoomsList
  //     } else { return this.roomsList }
  //   }
  // },
  watch: {
    search: function () {
      var newRoomsList = [{ rooms: [] }]
      var tempList = []
      if (this.search.length > 0) {
        for (var i = 0; i < this.roomsList.rooms.length; i++) {
          if (((this.building.babbrev + '-' + this.roomsList.rooms[i].rcode).toLowerCase()).includes(this.search.toLowerCase().trim())) {
            tempList.push(this.roomsList.rooms[i])
          }
        }
        newRoomsList.rooms = tempList
        if (newRoomsList.rooms.length === 0) {
          this.noDataAvailable = true
        } else {
          this.noDataAvailable = false
        }
        this.filteredRoomsList = newRoomsList
      } else {
        this.filteredRoomsList = this.roomsList
      }
    },
    roomsList: function () {
      this.filteredRoomsList = this.roomsList
    }
  },
  async mounted () {
    this.buildingID = this.$route.params.bid
    this.floorID = this.$route.params.fid
    await this.getRooms()
    this.building = this.roomsList.building
    console.log(this.building)
  },
  methods: {
    getRooms: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_FLOOR_ROOMS_1 + this.buildingID + process.env.VUE_APP_FLOOR_ROOMS_2 + this.floorID)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          if (data === null || data === '') {
            this.noDataAvailable = true
          } else {
            this.noDataAvailable = false
            this.roomsList = data
          }
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    },
    editCoordinates: function (longitude, latitude, altitude) {

    },
    getCurrentCoordinates: function () {

    },
    /**
     *  Validate form coordinate input using regex, the coordinate is a float number with a total of 0 to 4 decimals
     */
    validateCoordinates: function () {
      if (this.formLongitudeInput != null && this.formLatitudeInput != null) {
        if (this.formLongitudeInput.match(/^([+-]?\d{1,3})[.](\d{0,4})$/) && this.formLatitudeInput.match(/^([+-]?\d{1,3})[.](\d{0,4})$/)) {
          return true
        }
      }
      return false
    },
    followRoute: function (buildingid, floor, roomid) {
      // console.log('follow route')
      this.$router.push('/informationbase/buildings/' + buildingid + '/floors/' + floor + '/rooms/' + roomid + '/services')
    }
  }
}
</script>

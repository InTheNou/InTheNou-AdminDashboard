<template>
  <v-container class="grey lighten-5 mb-6" >
          <v-card class="pa-2" outlined tile >
           <v-card class="justify-center" >
              <v-img src="https://image.flaticon.com/icons/svg/950/950299.svg" aspect-ratio="1.7" contain></v-img>
              <v-card-title class="headline justify-center" >Service</v-card-title>
                <v-card-actions>
                    <v-dialog v-model="editServiceDialog" persistent max-width="900px">
                      <template v-slot:activator="{ on }">
                          <v-row justify="center">
                          <v-btn color="primary mb-5 pa-0" dark v-on="on" class="mx-2" fab>
                              <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                          </v-row>
                      </template>
                      <v-card>
                        <v-card-title>New Service Form</v-card-title>
                          <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            class="ma-6"
                          >
                          <v-row>
                            <v-col cols="4">
                              <v-select
                              @change="updateFloors()"
                              v-model="buildingName"
                              :rules="[ v => !!v]"
                              :items="buildings"
                              label="Building"
                              filled
                              required
                              ></v-select>
                            </v-col>
                            <v-col cols="4">
                              <v-select
                              @change="updateRooms()"
                              v-model="floor"
                              :rules="[ v => !!v]"
                              :items="floors"
                              label="Floor"
                              filled
                              required
                              ></v-select>
                            </v-col>
                            <v-col cols="4">
                              <v-select
                              v-model="roomID"
                              :rules="[ v => !!v]"
                              :items="rooms"
                              label="Room"
                              filled
                              required
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="4">
                              <v-text-field
                                v-model="name"
                                :counter="10"
                                :rules="[ v => !!v || 'Name is required', v => (v && v.length <= 10) || 'Name must be less than 10 characters' ]"
                                label="Name"
                                filled
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                v-model="schedule"
                                :counter="10"
                                :rules="[ v => !!v || 'Schedule is required', v => (v && v.length <= 10) || 'Schedule must be less than 10 characters' ]"
                                label="Schedule"
                                filled
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="5">
                              <v-text-field
                                v-model="phoneNumber"
                                :rules="[ ]"
                                label="Phone"
                                hint=" phone number: ###-###-####   phone with extentions: ###-###-####, ####"
                                filled
                              ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-select
                              v-model="phoneType"
                              :items="['extension','mobile','frame']"
                              label="Type"
                              filled
                              ></v-select>
                            </v-col>
                            <v-btn @click="addNumberToList" color="primary mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                              <v-icon dark>mdi-plus</v-icon>
                            </v-btn>
                            <v-btn @click="removeNumberFromList" color="red mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                              <v-icon dark>mdi-minus</v-icon>
                            </v-btn>
                          <v-col cols="6">
                            <v-textarea
                                v-model="phoneNumbersList"
                                label="Phone List"
                                filled
                                readonly
                              ></v-textarea>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="9">
                              <v-text-field
                                v-model="website"
                                label="Website"
                                hint=" www.abc.uprm.edu"
                                filled
                              ></v-text-field>
                            </v-col>
                            <v-btn @click="addWebsiteToList()" color="primary mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                              <v-icon dark>mdi-plus</v-icon>
                            </v-btn>
                            <v-btn @click="removeWebsiteFromList()" color="red mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                              <v-icon dark>mdi-minus</v-icon>
                            </v-btn>
                          <v-col cols="12">
                            <v-textarea
                                v-model="websitesList"
                                label="Websites List"
                                filled
                                readonly
                              ></v-textarea>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-textarea
                              v-model="description"
                              :rules="[ v => !!v || 'Description is required', v => (v && v.length <= 400) || 'Description must be less than 400 characters' ]"
                              label="Description"
                              filled
                              required
                            ></v-textarea>
                          </v-row>
                            <v-btn
                              color="success"
                              class="mr-4"
                              @click="editServiceDialog = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              :disabled="!valid"
                              color="success"
                              class="mr-4"
                              @click="validate"
                            >
                              Create
                            </v-btn>
                          </v-form>
                      </v-card>
                    </v-dialog>
              </v-card-actions>
            </v-card>
          </v-card>
    </v-container>
</template>

<script>
import { infobaseApiCall } from '../../dummyapicals/InformationBase.js'
export default {
  data: () => ({
    editServiceDialog: null,
    valid: true,
    name: null,
    description: null,
    schedule: null,
    website: null,
    websites: [],
    websitesList: [],
    phoneNumber: null,
    phoneType: null,
    phoneNumbers: [],
    phoneNumbersList: [],
    buildingName: null,
    buildingID: null,
    buildings: [],
    buildingList: [],
    floors: [],
    floor: null,
    roomName: null,
    roomID: null,
    rooms: [],
    roomList: []
  }),
  mounted: async function () {
    await this.getBuildings()

    for (var i = 0; i < this.buildingList.length; i++) {
      this.buildings.push(this.buildingList[i].Name)
    }
  },
  methods: {
    validate: function () {
      this.$refs.form.validate()
    },
    updateFloors: function () {
      console.log('on update floors')
      this.floors = []
      for (var i = 0; i < this.buildingList.length; i++) {
        if (this.buildingName === this.buildingList[i].Name) {
          for (var n = 0; n < this.buildingList[i].NumFloors; n++) {
            this.floors.push(n + 1)
          }
        }
      }
    },
    updateBuildingID: function () {
      for (var i = 0; i < this.buildingList.length; i++) {
        if (this.buildingName === this.buildingList[i].Name) {
          this.buildingID = this.buildingList[i].BID
        }
      }
    },
    updateRooms: async function () {
      this.updateBuildingID()
      this.rooms = []
      await this.getRooms()
      for (var i = 0; i < this.roomList.length; i++) {
        this.rooms.push(this.roomList[i].rCode)
      }
    },
    getBuildings: async function () {
      return await new Promise((resolve, reject) => {
        infobaseApiCall({ url: '/informationbase/buildings', method: 'GET' })
          .then(response => {
            resolve(this.buildingList = response.Building)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getRooms: async function () {
      return await new Promise((resolve, reject) => {
        infobaseApiCall({ url: '/informationbase/buildings/' + this.buildingID + '/floors/' + this.floor + '/rooms', method: 'GET' })
          .then(response => {
            resolve(this.roomList = response.Room)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    createService: function () {

    },
    addNumberToList: function () {
      var contains = false
      for (var i = 0; i < this.phoneNumbers.length; i++) {
        if (this.phoneNumbers[i].Number === this.phoneNumber) {
          contains = true
          alert('Entered number already in the phone list')
        } else {
          contains = false
        }
      }
      // regex for ###-###-#### or ###-###-####,####
      if (this.phoneNumber != null && ((this.phoneNumber.match(/^(\d{3})[-](\d{3})[-](\d{4})$/) && this.phoneType === 'mobile') || (this.phoneNumber.match(/^(\d{3})[-](\d{3})[-](\d{4})$/) && this.phoneType === 'frame') || (this.phoneNumber.match(/^(\d{3})[-](\d{3})[-](\d{4})([,](\d{4}))$/) && this.phoneType === 'extension')) && this.phoneNumbers.length < 10 && !contains) {
        var phone = {}
        phone.Number = this.phoneNumber.toString()
        phone.Type = this.phoneType
        this.phoneNumbers.push(phone)
        this.phoneNumbersList = JSON.stringify(this.phoneNumbers)
      } else {
        alert('1.The entered number must be valid. \n 2.A valid type must be selected. \n **For extensions do not forget to use ###-###-####,#### ')
      }
    },
    removeNumberFromList: function () {
      if (this.phoneNumbers.length > 0) {
        this.phoneNumbers.pop()
        this.phoneNumbersList = JSON.stringify(this.phoneNumbers)
      }
    },
    addWebsiteToList: function () {
      var contains = false
      for (var i = 0; i < this.websites.length; i++) {
        console.log(this.websites[i].URL)
        if (this.websites[i].URL === this.website) contains = true
        else contains = false
      }
      // regex for ###-###-#### or ###-###-####,####
      if (this.website != null && (this.website.match(/^(((https:\/\/)|(http:\/\/))[a-zA-z]*[.]?(uprm.edu)(.*))$/)) && this.websites.length < 10 && !contains) {
        var website = {}
        website.URL = this.website.toString()
        this.websites.push(website)
        this.websitesList = JSON.stringify(this.websites)
      } else {
        alert('1.The entered number must be valid \n 2.A type must be selected ')
      }
    },
    removeWebsiteFromList: function () {
      if (this.websites.length > 0) {
        this.websites.pop()
        this.websitesList = JSON.stringify(this.websites)
      }
    }
  }
}
</script>

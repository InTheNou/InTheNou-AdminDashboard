<template>
 <v-layout row wrap align-center justify-center>
  <v-flex xs6 offset xs-1 sm6 offset-sm1 md6 offset-md1>
          <v-card class="d-flex ma-10 ">
             <v-container id="scroll-target" style="max-height: 700px" class="overflow-y-auto">
                <v-row v-if="noDataAvailable" align="center" justify="center">
                     <h2 class="text-center" style="height:100%; align:center;"> NO AVAILABLE  SERVICES AT THE MOMENT </h2>
                </v-row>
                <v-row
                 v-else
                  style="height: 550px"  >
                <v-col
                v-for="service in servicesList"
                :key="service.sid"
                :cols="12">
                  <v-card height="100%">
                    <v-card-title class="headline blue darken-4 white--text" style="font-size:1vw;">
                      {{service.sname}}
                    </v-card-title>
                    <v-card-subtitle class="pt-0 pb-0 ma-0 blue accent-1">
                      Schedule: {{service.sschedule}}
                    </v-card-subtitle>
                    <v-card-text>
                    <v-card-subtitle class="pt-0 pb-0 ma-0" >
                      Description: {{service.sdescription}}
                    </v-card-subtitle>
                    </v-card-text>

                    <v-card-subtitle class="pt-0 pb-0 ma-0" >
                      Websites:
                     </v-card-subtitle>
                    <v-container id="scroll-target" style="max-height: 110px" class="overflow-y-auto">
                      <v-row >
                        <v-col
                        class="ma-0 pa-0"
                         v-for="website in service.Websites"
                        :key="website.wid"
                        :cols="12" >
                        <v-divider v-if="!website" :key="`divider-${i}`"></v-divider>
                        <v-list-item v-else :key="`item-${service.wdescription}`" :value="i" active-class="blue--text text--accent-4" >
                        <v-list-item-action>
                          <a
                          :href="website.url"
                          target="_blank"
                          class="body-2 black--text" >
                          {{website.wdescription}}
                          </a>
                        </v-list-item-action>
                        </v-list-item>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card-subtitle class="pt-0 pb-0 ma-0" >
                      Phones:
                    </v-card-subtitle>
                    <v-container id="scroll-target" style="max-height: 100px" class="overflow-y-auto">
                      <v-row >
                        <v-col
                        class="ma-0 pa-0"
                        v-for="phone in service.PNumbers"
                        :key="phone.phoneid"
                        :cols="12" >
                        <v-divider v-if="!phone" :key="`divider-${i}`"></v-divider>
                        <v-list-item v-else :key="`item-${i}`" :value="i" active-class="blue--text text--accent-4" >
                        <v-list-item-content>
                          <p>Phone:{{phone.pnumber}} - Type:{{phone.ptype}}</p>
                        </v-list-item-content>
                        </v-list-item>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <div>
                            <v-btn @click="editServiceDialog = !editServiceDialog, editServiceObject = service" color="primary mb-0 pa-0" dark class="mx-2" >
                                <v-icon dark>mdi-pencil-box-outline</v-icon>
                                Edit
                            </v-btn>
                        </div>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-card-actions>
                          <v-col cols="12">
                            <v-dialog v-model="editServiceDialog" persistent max-width="600px">
                                <v-card>
                                    <v-card-title>
                                      <v-text-field label="Name*" :value=editServiceObject.sname> </v-text-field>
                                    </v-card-title>
                                    <v-card-text>
                                    <v-container>
                                      <v-text-field label="Schedule*" :value=editServiceObject.sschedule> </v-text-field>
                                      <v-text-field label="Description*" :value=editServiceObject.sdescription> </v-text-field>
                                      <v-row>
                                        <v-col cols="5">
                                          <v-text-field
                                            v-model="formInputPhoneNumber"
                                            :rules="[ ]"
                                            label="Phone"
                                            hint=" phone number: ###-###-####   phone with extentions: ###-###-####,####"
                                            filled
                                          ></v-text-field>
                                        </v-col>
                                        <v-col cols="3">
                                          <v-select
                                          v-model="phoneType"
                                          :items="['extension','mobile','frame']"
                                          label="Type"
                                          filled
                                          ></v-select>
                                        </v-col>
                                        <v-btn @click="addNumberToList()" color="primary mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                                          <v-icon dark>mdi-plus</v-icon>
                                        </v-btn>
                                        <v-btn @click="removeNumberFromList()" color="red mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                                          <v-icon dark>mdi-minus</v-icon>
                                        </v-btn>
                                        <v-col cols="12">
                                        <v-card >
                                          <v-list shaped>
                                            <v-list-item-group  multiple>
                                            <v-container id="scroll-target" style="max-height: 600px" class="overflow-y-auto">
                                              <v-row  style="height: 150px"  >
                                              <v-col v-for="(website, i) in editServiceObject.Websites"
                                                 :key="website.wid"
                                                 :cols="12" >
                                                <v-divider v-if="!website" :key="`divider-${i}`"></v-divider>
                                                <v-list-item v-else :key="`item-${website}`" :value="i" active-class="blue--text text--accent-4" >
                                                  <template v-slot:default="{ active, toggle }">
                                                      <v-list-item-content >
                                                        <v-list-item-title>
                                                          <v-list-item-action>
                                                            <v-checkbox
                                                              :input-value="active"
                                                              :true-value="i"
                                                              color="blue accent-4"
                                                              @click="toggle"
                                                            ></v-checkbox>
                                                          </v-list-item-action>
                                                          <v-list-item-action>
                                                            {{website.url}}
                                                          </v-list-item-action>
                                                      </v-list-item-title>
                                                      </v-list-item-content>
                                                  </template>
                                                </v-list-item>
                                              </v-col>
                                             </v-row>
                                            </v-container>
                                            </v-list-item-group>
                                          </v-list>
                                        </v-card>
                                      </v-col>
                                      </v-row>
                                    <v-row>
                                      <v-col cols="8">
                                        <v-text-field
                                          v-model="formInputWebsite"
                                          label="Website"
                                          hint="  http:// or https://, abc.def abc.def.ghi"
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
                                        <v-card >
                                          <v-list shaped>
                                            <v-list-item-group  multiple>
                                            <v-container id="scroll-target" style="max-height: 600px" class="overflow-y-auto">
                                              <v-row  style="height: 150px"  >
                                              <v-col v-for="(website, i) in editServiceObject.Websites"
                                                 :key="website.wid"
                                                 :cols="12" >
                                                <v-divider v-if="!website" :key="`divider-${i}`"></v-divider>
                                                <v-list-item v-else :key="`item-${i}`" :value="i" active-class="blue--text text--accent-4" >
                                                  <template v-slot:default="{ active, toggle }">
                                                      <v-list-item-content >
                                                        <v-list-item-title>
                                                          <v-list-item-action>
                                                            <v-checkbox
                                                              :input-value="active"
                                                              :true-value="i"
                                                              color="blue accent-4"
                                                              @click="toggle"
                                                            ></v-checkbox>
                                                          </v-list-item-action>
                                                          <v-list-item-action>
                                                            {{website.wdescription}}
                                                          </v-list-item-action>
                                                      </v-list-item-title>
                                                      </v-list-item-content>
                                                  </template>
                                                </v-list-item>
                                              </v-col>
                                             </v-row>
                                            </v-container>
                                            </v-list-item-group>
                                          </v-list>
                                        </v-card>
                                      </v-col>
                                    </v-row>
                                    </v-container>
                                    <small>*indicates required field</small>
                                    </v-card-text>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="editServiceDialog = false">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text  :disabled="save()" @click="editEditServiceDialog = false" >save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                          </v-col>
                    </v-card-actions>
                 </v-row>
             </v-container>
          </v-card>
  </v-flex>
 </v-layout>
</template>

<script>
import { offset, limit, next, previous } from '../utils/methods.js'
export default {
  data: () => ({
    noDataAvailable: false,
    editServiceDialog: false,
    editServiceID: null,
    editServiceObject: [],
    buildingID: null,
    floorID: null,
    roomID: null, // room ID
    roomCode: null,
    servicesList: [],
    phoneType: '',
    path: '',
    offset,
    limit,
    formInputPhoneNumber: null,
    formInputWebsite: null,
    websites: [{ Websites: [{ url: 'url', wdescription: 'string' }, { url: 'url', wdescription: 'string' }] }] // dummy for now till Diego serves websites
  }),
  mounted () {
    this.buildingID = this.$route.params.bid
    this.floorID = this.$route.params.fid
    this.roomID = this.$route.params.rid
    this.getServices()
  },
  methods: {
    /**
     * void : fetch all services of a room using the roomID variable instance of the Vue instance then assign the response value to servicesList instance
     * error: generates a Dialog in case of error notifying the user
     */
    getServices: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_GET_ROOM_SERVICES_1 + this.roomID + process.env.VUE_APP_GET_ROOM_SERVICES_2)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          if (data === null || data === undefined) {
            this.noDataAvailable = true
          } else {
            this.noDataAvailable = false
            this.servicesList = data.Services
          }
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    },
    /**
     *  Validate form coordinate input using regex, the coordinate is a float number with a total of 0 to 4 decimals
     */
    save: function () {
      // /^[+-]?\d+(\.\d+)?$/
      if (this.formLongitudeInput != null && this.formLatitudeInput != null) {
        if (this.formLongitudeInput.match(/^([+-]?\d{1,3})[.](\d{0,4})$/) && this.formLatitudeInput.match(/^([+-]?\d{1,3})[.](\d{0,4})$/)) {
          return true
        }
      }
      return false
    },
    /**
     * removes website from
     */
    addServiceWebsites: async function () {
      return await fetch(
        process.env.VUE_APP_API_HOST + process.env.VUE_APP_ADD_SERVICE_WEBSITE_1 + this.ServiceID + process.env.VUE_APP_ADD_SERVICE_WEBSITE_1,
        {
          method: 'POST',
          mode: 'cors',
          credential: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([{ Websites: [this.editServiceObject.Websites] }])
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then(data => {
          this.editServiceObject.Websites = data // update to new websites urls
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    },
    /**
     *
     */
    removeServiceWebsites: async function () {
      return await fetch(
        process.env.VUE_APP_API_HOST + process.env.VUE_APP_ADD_SERVICE_WEBSITE_1 + this.ServiceID + process.env.VUE_APP_ADD_SERVICE_WEBSITE_1,
        {
          method: 'POST',
          mode: 'cors',
          credential: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.user)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then(data => {
          this.$store.dispatch('AUTH_REQUEST', data.uid).then(() => {
            this.$router.push('/allcurrentevents')
          })
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    },
    /**
     *
     */
    addServicephoneNumbers: function () {
    },
    /**
     *
     */
    removeServicePhoneNumbers: function () {
    },
    /**
     *
     */
    updateService: function () {
    },
    previous,
    next,
    /**
     *
     */
    addWebsiteToList: function () {

    },
    /**
     *
     */
    removeWebsiteFromList: function () {

    },
    /**
     *
     */
    addNumberToList: function () {

    },
    /**
     *
     */
    removeNumberFromList: function () {

    }
  }
}
</script>

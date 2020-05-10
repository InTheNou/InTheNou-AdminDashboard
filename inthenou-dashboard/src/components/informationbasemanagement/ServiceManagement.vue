<template>
    <v-container class="grey lighten-5 mb-6" style="max-width: 1500px;">
      <v-text-field
            v-model="search"
            label="Search"
            class="mb-5"
            prepend-inner-icon="mdi-magnify"
            flat
            single-line
            hide-details
          ></v-text-field>
    <v-card class="justify-center" >
        <v-card >
            <v-data-table
              :headers="headers"
              :items="serviceObjectsList"
              :search="search"
              class="elevation-1"
              max-heigth="500px"
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Services</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-form
                    ref="serviceForm"
                    persistent
                    v-model="validService"
                    class="ma-6"
                  >
                  <v-dialog persistent v-model="dialog" max-width="1000px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark class="mb-2" v-on="on">New Service</v-btn>
                    </template>
                    <v-card >
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close('service')"><v-icon dark>mdi-close</v-icon></v-btn>
                      </v-card-title>
                      <v-card-subtitle>* required field</v-card-subtitle>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="6">
                              <v-select
                              v-model="editedServiceObject.room.building.bname"
                              :items="buildingSelectList"
                              :rules="[v => !!v]"
                              label="Building*"
                              outlined
                              clearable
                              required
                              ></v-select>
                            </v-col>
                            <v-col cols="3">
                              <v-select
                              v-model="editedServiceObject.room.rfloor"
                              :items="floorSelectList"
                              :rules="[v => (!isNaN(parseFloat(v)) && v >= 0)]"
                              label="Floor*"
                              outlined
                              clearable
                              required
                              ></v-select>
                            </v-col>
                            <v-col cols="3">
                              <v-select
                              v-model="editedServiceObject.room.rcode"
                              :items="roomsSelectList"
                              :rules="[v => !!v]"
                              label="Room*"
                              outlined
                              clearable
                              required
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="editedServiceObject.sname"
                                :counter="50"
                                :rules="[ v => !!v || 'Name is required', v => (v && v.length <= 50) || 'Name must be less than 50 characters' ]"
                                label="Service Name*"
                                outlined
                                clearable
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                            <v-text-field
                              v-model="editedServiceObject.sschedule"
                              :rules="[ v => ( v.length <= 200) || 'schedule must be less than 200 characters' ]"
                              label="Schedule"
                              persistent-hint="L,M,W,V,S,D: HH:MM PM/AM - HH:MM PM/AM, L-V: HH:MM PM/AM - HH:MM PM/AM"
                              placeholder="L,M,W,V,S,D: HH:MM PM/AM - HH:MM PM/AM, L-V: HH:MM PM/AM - HH:MM PM/AM"
                              :counter="200"
                              outlined
                              clearable
                            ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-textarea
                              v-model="editedServiceObject.sdescription"
                              :rules="[ v => !!v || 'Description is required', v => (v && v.length <= 400) || 'Description must be less than 400 characters' ]"
                              label="Description*"
                              :counter="400"
                              outlined
                              clearable
                              required
                            ></v-textarea>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text :disabled="!validService"  @click="save">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  </v-form>
                  <v-form
                    ref="websiteForm"
                    persistent
                    v-model="validWebsite"
                    class="ma-6"
                  >
                  <v-dialog persistent v-model="websiteDialog" max-width="1000px">
                    <v-card>
                      <v-card-title>
                        <span class="headline">Service: {{editedServiceObject.sname}}</span>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close('website')"><v-icon dark>mdi-close</v-icon></v-btn>
                      </v-card-title>
                      <v-card-subtitle>
                        <span>* Required fields</span>
                      </v-card-subtitle>
                      <v-card-text>
                      <v-container>
                      <v-row>
                            <v-col cols="9">
                              <v-text-field
                                v-model="websiteFormInput"
                                :rules="websiteRules"
                                label="Website*"
                                required
                                placeholder="http://sub.domain.extension/paths..."
                                outlined
                                clearable
                              ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                            <v-btn :disabled="!validWebsite" @click="validate('website')" color="primary mb-0 mt-3 pa-0 "   class="mx-2" >
                              <!-- <v-icon dark>mdi-plus</v-icon> -->
                              ADD
                            </v-btn>
                            </v-col>
                             <v-col cols="9">
                              <v-text-field
                                v-model="websiteDescriptionFormInput"
                                label="Website Description*"
                                :counter="30"
                                :rules="websiteDescriptionRules"
                                outlined
                                required
                                clearable
                              ></v-text-field>
                            </v-col>
                            <v-card class="pa-5" style="width: 100%;">
                              <v-card-title class="headline justify-center blue darken-4 white--text" >
                                Current Websites List
                              </v-card-title>
                              <hr />
                              <v-container id="scroll-target" style="max-height: 200px" class="overflow-y-auto">
                                <v-row  style="height: 200px"  >
                                  <v-col cols="12" v-if="editedServiceObject.websites.length <= 0">
                                    <v-card>
                                      <v-card-title>
                                      The service has  no websites at the moment
                                      </v-card-title>
                                    </v-card>
                                  </v-col>
                                  <v-col cols="12" v-else>
                                    <v-card >
                                      <v-list shaped>
                                        <v-list-item-group v-model="removedWebsitesList" multiple>
                                          <template v-for="(website, i) in editedServiceObject.websites">
                                            <v-divider v-if="!website" :key="`divider-${i}`"></v-divider>
                                            <v-list-item v-else :key="`item-${i}`" :value="website" active-class="blue--text text--accent-4" >
                                              <template v-slot:default="{ active, toggle }">
                                                  <v-row>
                                                    <v-col cols="12" class="pb-0">
                                                      Url:
                                                      <a
                                                      :href="website.url"
                                                      target="_blank"
                                                      class="body-2 black--text" >
                                                      {{website.url}}
                                                      </a>
                                                      </v-col>
                                                    <v-col cols="12" class="pt-0">
                                                    <v-list-item-title class="pa-0">Description:{{website.wdescription}}</v-list-item-title>
                                                    </v-col>
                                                  </v-row>
                                                      <v-list-item-action>
                                                        <v-checkbox
                                                          :input-value="active"
                                                          :true-value="website"
                                                          color="blue accent-4"
                                                          @click="toggle"
                                                        ></v-checkbox>
                                                      </v-list-item-action>
                                              </template>
                                            </v-list-item>
                                          </template>
                                        </v-list-item-group>
                                      </v-list>
                                    </v-card>
                                  </v-col>
                                </v-row>
                              </v-container>
                              <v-card-actions class="justify-center">
                                <v-row>
                                  <v-col cols="12">
                                    <v-dialog v-model="websitestoRemoveDialog" scrollable max-width="300px">
                                      <template v-slot:activator="{ on }">
                                        <div class="text-center ma-0 pa-0">
                                          <v-btn  :disabled="removedWebsitesList.length<=0"  large color="primary"  v-on="on" class="pa-0">
                                            <h1>Remove</h1>
                                          </v-btn>
                                        </div>
                                      </template>
                                      <v-card>
                                        <v-card-title>Remove  websites</v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text style="height: 300px;">
                                          <ul>
                                            <li v-for="website in removedWebsitesList" :key="website.id">{{ website.url }}</li>
                                          </ul>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                          <v-btn color="blue darken-1"  @click="websitestoRemoveDialog = false">Cancel</v-btn>
                                          <v-btn color="blue darken-1"  @click="removeWebsiteFromList">Continune</v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>
                                  </v-col>
                                </v-row>
                              </v-card-actions>
                            </v-card>
                          </v-row>
                      </v-container>
                      </v-card-text>
                      <!-- <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close('website')">Close</v-btn>
                      </v-card-actions> -->
                    </v-card>
                  </v-dialog>
                  </v-form>
                  <v-form
                    ref="phoneForm"
                    persistent
                    v-model="validPhone"
                    class="ma-6"
                  >
                  <v-dialog v-model="phonesDialog" max-width="1000px">
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{editedServiceObject.sname}}</span>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close('phone')"><v-icon dark>mdi-close</v-icon></v-btn>
                      </v-card-title>
                      <v-card-subtitle>
                        <span>* Required fields</span>
                      </v-card-subtitle>
                      <v-card-text>
                      <v-container>
                      <v-row>
                            <v-col cols="5">
                              <v-text-field
                                v-model="phoneNumberFormInput"
                                :rules="[v => !!v || 'a phone number is required', v => /^(\d{3})[-](\d{3})[-](\d{4})([,](\d{4}))|(\d{3})[-](\d{3})[-](\d{4})$/.test(v) || 'Mobile, Frame: ###-###-####   Extentions: ###-###-####, ####']"
                                label="Phone"
                                hint=" Mobile, Frame: ###-###-####   Extentions: ###-###-####, ####"
                                outlined
                                required
                                clearable
                              ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                              <v-select
                              v-model="phoneTypeSelected"
                              :items="phoneTypeSelectList"
                              :rules="[v => !!v || 'a phone type is required']"
                              label="Type"
                              outlined
                              required
                              clearable
                              ></v-select>
                            </v-col>
                            <v-col cols="3">
                            <v-btn :disabled="!validPhone" @click="validate('phone')" color="primary mb-0 mt-3 pa-0 "  class="mx-2" >
                              <!-- <v-icon dark>mdi-plus</v-icon> -->
                              ADD
                            </v-btn>
                            </v-col>
                            <v-card class="pa-5" style="width: 100%;">
                              <v-card-title class="headline justify-center blue darken-4 white--text" >
                                Current phone List
                              </v-card-title>
                              <hr />
                              <v-container id="scroll-target" style="max-height: 200px" class="overflow-y-auto">
                                <v-row  style="height: 200px"  >
                                  <v-col cols="12" v-if="(editedServiceObject.numbers.length <= 0)">
                                    <v-card>
                                      <v-card-title>
                                      The service has  no phone numbers at the moment
                                      </v-card-title>
                                    </v-card>
                                  </v-col>
                                  <v-col v-else cols="12">
                                    <v-card >
                                      <v-list shaped>
                                        <v-list-item-group v-model="removedPhoneNumbers" multiple>
                                          <template v-for="(phone, i) in editedServiceObject.numbers">
                                            <v-divider v-if="!phone" :key="`divider-${i}`"></v-divider>
                                            <v-list-item v-else :key="`item-${i}`" :value="phone" active-class="blue--text text--accent-4" >
                                              <template v-slot:default="{ active, toggle }">
                                                  <v-row>
                                                    <v-col cols="12" class="pt-0">
                                                    <v-list-item-title class="pa-0">
                                                      <v-icon>{{(phone.ptype == 'M' ?  'mdi-cellphone' : phone.ptype == 'E' ? 'mdi-deskphone' :  'mdi-phone' )}}</v-icon> ({{phone.pnumber}}, {{(phone.ptype == 'M' ?  'Mobile' : phone.ptype == 'E' ? 'Extension' :  'Frame' )}})
                                                    </v-list-item-title>
                                                    </v-col>
                                                  </v-row>
                                                      <v-list-item-action>
                                                        <v-checkbox
                                                          :input-value="active"
                                                          :true-value="website"
                                                          color="blue accent-4"
                                                          @click="toggle"
                                                        ></v-checkbox>
                                                      </v-list-item-action>
                                              </template>
                                            </v-list-item>
                                          </template>
                                        </v-list-item-group>
                                      </v-list>
                                    </v-card>
                                  </v-col>
                                </v-row>
                              </v-container>
                              <v-card-actions class="justify-center">
                                <v-row>
                                  <v-col cols="12">
                                    <v-dialog v-model="phonestoRemoveDialog" scrollable max-width="300px">
                                      <template v-slot:activator="{ on }">
                                        <div class="text-center">
                                          <v-btn  :disabled="removedPhoneNumbers.length <= 0"  large color="primary"  v-on="on" class="pa-0">
                                            <h1>Remove</h1>
                                          </v-btn>
                                        </div>
                                      </template>
                                      <v-card>
                                        <v-card-title>Deleting  phones</v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text style="height: 300px;">
                                          <ul>
                                            <li v-for="phone in removedPhoneNumbers" :key="phone.id">{{ phone.pnumber }}</li>
                                          </ul>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                          <v-btn   @click="phonestoRemoveDialog = false">Cancel</v-btn>
                                          <v-btn   @click="removeNumberFromList">Continune</v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>
                                  </v-col>
                                </v-row>
                              </v-card-actions>
                            </v-card>
                          </v-row>
                      </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- <v-btn color="blue darken-1" text @click="close('phone')">Close</v-btn> -->
                        <!-- <v-btn color="blue darken-1" text :disabled="!valid"  @click="save">Save</v-btn> -->
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  </v-form>
                  <!-- </v-form> -->
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editServiceObject(item, 'service')"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="editServiceObject(item, 'website')"
                >
                  mdi-web
                </v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="editServiceObject(item, 'phone')"
                >
                  mdi-phone-log
                </v-icon>
                <v-icon
                  small
                  @click="deleteServiceObject(item)"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
        </v-card>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    search: '',
    validService: true,
    validWebsite: true,
    validPhone: true,
    dialog: false,

    scheduleDaySelectList:
    [
      'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'
    ],
    websiteFormInput: '',
    websiteDescriptionFormInput: '',
    websitesList: { websites: [] },
    removedWebsitesList: [],
    websiteRules:
    [
      websiteDescriptionFormInput => /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/.test(websiteDescriptionFormInput) || 'invalid website format'
    ],
    websiteDescriptionRules:
    [
      websiteDescriptionRules => !!websiteDescriptionRules || 'A description must be given along a url'
    ],
    phoneNumberFormInput: null,
    phoneTypeSelectList: ['Extension', 'Mobile', 'Frame'],
    phoneTypeSelected: null,
    phoneNumbers: { numbers: [] },
    removedPhoneNumbers: [],
    buildingSelectList: [],
    floorSelectList: [],
    buildingObjectsList: [],

    roomsSelectList: [],
    roomObjectsList: [],

    headers: [
      { text: 'Service Name', align: 'start', sortable: true, value: 'sname' },
      { text: 'Building', value: 'room.building.bname', sortable: false },
      { text: 'Room', value: 'room.rcode', sortable: false },
      { text: 'schedule', value: 'sschedule', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    serviceObjectsList: [],
    editedServiceObjectIndex: -1,
    editedServiceObject: {
      numbers: [],
      room: {
        building: {
          babbrev: '',
          bcommonname: '',
          bid: null,
          bname: '',
          btype: '',
          distinctfloors: [],
          numfloors: null,
          photourl: ''
        },
        photourl: '',
        raltitude: null,
        rcode: '',
        rcustodian: '',
        rdept: '',
        rdescription: '',
        rfloor: null,
        rid: null,
        rlatitude: null,
        rlongitude: null,
        roccupancy: null
      },
      sdescription: '',
      sid: null,
      sname: '',
      sschedule: '',
      websites: []
    },
    defaultServiceObject: {
      numbers: [],
      room: {
        building: {
          babbrev: '',
          bcommonname: '',
          bid: null,
          bname: '',
          btype: '',
          distinctfloors: [],
          numfloors: null,
          photourl: ''
        },
        photourl: '',
        raltitude: null,
        rcode: '',
        rcustodian: '',
        rdept: '',
        rdescription: '',
        rfloor: null,
        rid: null,
        rlatitude: null,
        rlongitude: null,
        roccupancy: null
      },
      sdescription: '',
      sid: null,
      sname: '',
      sschedule: '',
      websites: []
    },
    websiteDialog: false,
    websitestoRemoveDialog: false,
    phonesDialog: false,
    phonestoRemoveDialog: false
  }),
  watch: {
    /**
     *
     */
    'editedServiceObject.room.building.bname': function () {
      this.floorSelectList.length = 0
      for (var i = 0; i < this.buildingObjectsList.length; i++) {
        if (this.buildingObjectsList[i].bname === this.editedServiceObject.room.building.bname) {
          this.editedServiceObject.room.building.bid = this.buildingObjectsList[i].bid
          for (var n = 0; n < this.buildingObjectsList[i].numfloors; n++) {
            this.floorSelectList.push(this.buildingObjectsList[i].distinctfloors[n])
          }
        }
      }
    },
    /**
     *
     */
    'editedServiceObject.room.rfloor': async function () {
      if (this.editedServiceObject.room.rfloor !== null) {
        this.roomsSelectList.length = 0
        await this.fetchRooms()
        for (var i = 0; i < this.roomObjectsList.length; i++) {
          this.roomsSelectList.push(this.roomObjectsList[i].rcode)
        }
      }
    },
    'editedServiceObject.room.rcode': function () {
      for (var i = 0; i < this.roomObjectsList.length; i++) {
        if (this.roomObjectsList[i].rcode === this.editedServiceObject.room.rcode) {
          this.editedServiceObject.room.rid = this.roomObjectsList[i].rid
        }
      }
    },
    /**
     *
     */
    dialog (val) {
      val || this.close('service')
    }
  },
  computed: {
    /**
     *
     */
    ...mapGetters([
      'uid'
    ]),
    /**
     *
     */
    formTitle () {
      return this.editedServiceObjectIndex === -1 ? 'New Service' : 'Edit Service'
    }
  },
  /**
   *
   */
  created: async function () {
    await this.fetchBuildings()
    await this.fetchServices()
  },
  methods: {
    /**
     *
     */
    fetchServices: async function () {
      await fetch(process.env.VUE_APP_API_HOST + '/API/Dashboard/Services/offset=' + 0 + '/limit=' + 10000)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          if (data.services === null || data.services === undefined) {
          } else {
            this.serviceObjectsList = data.services
          }
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    },
    /**
     *
     */
    editServiceObject (item, view) {
      this.editedServiceObjectIndex = this.serviceObjectsList.indexOf(item)
      this.editedServiceObject = Object.assign({}, item)
      if (this.editedServiceObject.websites === null) this.editedServiceObject.websites = []
      if (this.editedServiceObject.numbers === null) this.editedServiceObject.numbers = []
      switch (view) {
        case 'phone':
          this.phonesDialog = true
          break
        case 'website':
          this.websiteDialog = true
          break
        default:
          this.dialog = true
      }
    },
    /**
     *
     */
    close (type) {
      if (type === 'service') {
        this.dialog = false
      } else if (type === 'phone') {
        this.phonesDialog = false
        this.removedPhoneNumbers = []
      } else if (type === 'website') {
        this.websiteDialog = false
        this.removedWebsites = []
      }
      this.$nextTick(() => {
        this.editedServiceObject = Object.assign({}, this.defaultServiceObject)
        this.editedServiceObjectIndex = -1
      })
    },
    /**
     *
     */
    deleteServiceObject: async function (item) {
      const index = this.serviceObjectsList.indexOf(item)
      if (confirm('Are you sure you want to delete this service?')) {
        await fetch(
          process.env.VUE_APP_API_HOST + process.env.VUE_APP_DELETE_SERVICE_BY_ID_1 + this.serviceObjectsList[index].sid + process.env.VUE_APP_DELETE_SERVICE_BY_ID_2,
          {
            method: 'POST',
            mode: 'cors',
            credential: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error)
          })
        this.serviceObjectsList.splice(index, 1)
      }
    },
    save: async function () {
      if (this.editedServiceObjectIndex > -1) {
        // the existing  was edited
        await this.editService()
      } else {
        // a new tag was created
        await this.createService()
      }
      this.close('service')
    },
    // form methods
    validate: function (type) {
      if (type === 'service') {
        this.$refs.serviceForm.validate()
        if (this.validService) {
          this.save()
        }
      } else if (type === 'phone') {
        this.$refs.websiteForm.validate()
        if (this.validPhone) {
          this.addNumberToList()
        }
      } else if (type === 'website') {
        this.$refs.phoneForm.validate()
        if (this.validWebsite) {
          this.addWebsiteToList()
        }
      }
    },
    /**
     *
     */
    fetchBuildings: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_BUILDINGS_1 + 0 + process.env.VUE_APP_BUILDINGS_2 + 100)
        .then((response) => {
          // console.log(response)
          return response.json()
        })
        .then((data) => {
          this.buildingObjectsList = data
          // console.log(data)
        })
      for (var i = 0; i < this.buildingObjectsList.length; i++) {
        this.buildingSelectList.push(this.buildingObjectsList[i].bname)
      }
    },
    /**
     *
     */
    fetchRooms: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_FLOOR_ROOMS_1 + this.editedServiceObject.room.building.bid + process.env.VUE_APP_FLOOR_ROOMS_2 + this.editedServiceObject.room.rfloor)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          this.roomObjectsList = data.rooms
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    },
    /**
     *
     */
    createService: async function () {
      // first the body for the POST method is created using the recolected inputs
      var service = {}
      service.uid = this.uid
      service.rid = this.editedServiceObject.room.rid
      service.sname = this.editedServiceObject.sname
      service.sdescription = this.editedServiceObject.sdescription
      service.sschedule = this.editedServiceObject.sschedule
      service.numbers = this.editedServiceObject.numbers
      service.websites = this.editedServiceObject.websites

      await fetch(
        process.env.VUE_APP_API_HOST + process.env.VUE_APP_CREATE_SERVICE,
        {
          method: 'POST',
          mode: 'cors',
          credential: 'include',
          body: JSON.stringify(service),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          this.serviceObjectsList.push(data)
        })
        .catch(error => {
          console.error(error)
        })
    },
    editService: async function () {
      var service = {}
      service.uid = this.uid
      service.rid = this.editedServiceObject.room.rid
      service.sname = this.editedServiceObject.sname
      service.sdescription = this.editedServiceObject.sdescription
      service.sschedule = this.editedServiceObject.sschedule

      service.numbers = this.editedServiceObject.numbers
      service.websites = this.editedServiceObject.websites
      await fetch(
        process.env.VUE_APP_API_HOST + '/API/Dashboard/Services/sid=' + this.editedServiceObject.sid + '/update',
        {
          method: 'POST',
          mode: 'cors',
          credential: 'include',
          body: JSON.stringify(service),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then(
          Object.assign(this.serviceObjectsList[this.editedServiceObjectIndex], this.editedServiceObject)
        )
        .catch(error => {
          console.error(error)
        })
    },
    /**
     *
     */
    addNumberToList: async function () {
      var contains = false
      for (var i = 0; i < this.editedServiceObject.numbers.length; i++) {
        if ((this.editedServiceObject.numbers[i].pnumber === this.phoneNumberFormInput) && (this.editedServiceObject.numbers[i].ptype === (this.phoneTypeSelected === 'Mobile' ? 'M' : this.phoneTypeSelected === 'Extension' ? 'E' : 'F'))) {
          contains = true
          alert('Entered number already in the phone list')
        } else {
          contains = false
        }
      }
      // regex for ###-###-#### or ###-###-####,####
      if (((this.phoneNumberFormInput.match(/^(\d{3})[-](\d{3})[-](\d{4})$/) && (this.phoneTypeSelected === 'Mobile' || this.phoneTypeSelected === 'Frame')) || (this.phoneNumberFormInput.match(/^(\d{3})[-](\d{3})[-](\d{4})([,](\d{4}))$/) && this.phoneTypeSelected === 'Extension')) && !contains) {
        var newphone = { numbers: [{ pnumber: '', ptype: '' }] }
        newphone.numbers[0].pnumber = this.phoneNumberFormInput.toString()
        newphone.numbers[0].ptype = (this.phoneTypeSelected === 'Mobile' ? 'M' : this.phoneTypeSelected === 'Extension' ? 'E' : 'F')
        if (this.editedServiceObject.numbers === null) this.editedServiceObject.numbers = []
        await fetch(
          process.env.VUE_APP_API_HOST + '/API/Dashboard/Services/sid=' + this.editedServiceObject.sid + '/phone/add',
          {
            method: 'POST',
            mode: 'cors',
            credential: 'include',
            body: JSON.stringify(newphone),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .then((data) => {
            newphone.numbers[0].pid = data.numbers[0].pid
            this.editedServiceObject.numbers.push(newphone.numbers[0])
          })
          .catch(error => {
            console.error(error)
          })
      } else if (!contains) {
        alert('Invalid Number:. \n A valid type must be selected. \n **Extensions: ###-###-####,#### \n **Mobile, Frame: ###-###-#### ')
      }
    },
    /**
     *
     */
    removeNumberFromList: async function () {
      if (this.editedServiceObject.numbers === null) this.editedServiceObject.numbers = []
      this.phonestoRemoveDialog = false
      var removedPhones = { numbers: [] }
      for (var i = 0; i < this.removedPhoneNumbers.length; i++) {
        removedPhones.numbers.push({ phoneid: this.removedPhoneNumbers[i].phoneid })
        var index = this.editedServiceObject.numbers.indexOf(this.removedPhoneNumbers[i])
        this.editedServiceObject.numbers.splice(index, 1)
      }

      await fetch(
        process.env.VUE_APP_API_HOST + '/API/Dashboard/Services/sid=' + this.editedServiceObject.sid + '/phone/remove',
        {
          method: 'POST',
          mode: 'cors',
          credential: 'include',
          body: JSON.stringify(removedPhones),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(
        )
        .catch(error => {
          console.error(error)
        })
    },
    /**
     *
     */
    addWebsiteToList: async function () {
      var contains = false
      for (var i = 0; i < this.editedServiceObject.websites.length; i++) {
        if (this.editedServiceObject.websites[i].url === this.websiteFormInput) {
          contains = true
          alert('Entered url is already in the website list')
        } else {
          contains = false
        }
      }
      if (this.websiteFormInput != null && (this.websiteFormInput.match(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/)) && !contains && this.websiteDescriptionFormInput.length > 0) {
        var newWebsite = { websites: [{ url: '', wdescription: '' }] }
        newWebsite.websites[0].url = this.websiteFormInput.toString()
        newWebsite.websites[0].wdescription = this.websiteDescriptionFormInput.toString()
        if (this.editedServiceObject.websites === null) this.editedServiceObject.websites = []
        await fetch(
          process.env.VUE_APP_API_HOST + '/API/Dashboard/Services/sid=' + this.editedServiceObject.sid + '/website/add',
          {
            method: 'POST',
            mode: 'cors',
            credential: 'include',
            body: JSON.stringify(newWebsite),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .then((data) => {
            newWebsite.websites[0].wid = data.websites[0].wid
            this.editedServiceObject.websites.push(newWebsite.websites[0])
          })
          .catch(error => {
            console.error(error)
          })
      } else if (!contains && this.websiteDescriptionFormInput.length > 0) {
        alert(' The entered website must be a valid format ')
      } else if (this.websiteDescriptionFormInput.length <= 0) {
        alert(' A description must be given along url website ')
      }
    },
    /**
     *
     */
    removeWebsiteFromList: async function () {
      if (this.editedServiceObject.websites === null) this.editedServiceObject.websites = []
      this.websitestoRemoveDialog = false
      var removedWebsites = { websites: [] }
      for (var i = 0; i < this.removedWebsitesList.length; i++) {
        removedWebsites.websites.push({ wid: this.removedWebsitesList[i].wid })

        var index = this.editedServiceObject.websites.indexOf(this.removedWebsitesList[i])
        this.editedServiceObject.websites.splice(index, 1)
      }

      await fetch(
        process.env.VUE_APP_API_HOST + '/API/Dashboard/Services/sid=' + this.editedServiceObject.sid + '/website/remove',
        {
          method: 'POST',
          mode: 'cors',
          credential: 'include',
          body: JSON.stringify(removedWebsites),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(
        )
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

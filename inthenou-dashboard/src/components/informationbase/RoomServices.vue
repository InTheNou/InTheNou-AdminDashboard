<template>
  <v-card
    class="d-flex pa-2"
  >
    <v-container fluid>
      <v-row dense>
          <v-card class="d-flex pa-2">
            <v-container fluid>
              <v-row dense>
                <v-col v-for="service in servicesList" :key="service.sid" :cols="4">
                  <v-card height="100%">
                    <v-card-title class="headline blue darken-4 white--text" style="font-size:1vw;"> {{service.sname}}
                    </v-card-title>
                    <v-card-subtitle class="pt-0 pb-0 ma-0 blue accent-1">Schedule: {{service.sschedule}} </v-card-subtitle>
                    <v-card-text>
                    <v-card-subtitle class="pt-0 pb-0 ma-0" >Description: {{service.sdescription}} </v-card-subtitle>
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <div>
                            <v-btn @click="editServiceDialog = !editServiceDialog" color="primary mb-0 pa-0" dark class="mx-2" >
                                <v-icon dark>mdi-pencil-box-outline</v-icon>Edit
                            </v-btn>
                        </div>
                    </v-card-actions>
                  </v-card>
                </v-col>
                    <v-card-actions>
                          <v-col cols="4">
                            <v-dialog v-model="editServiceDialog" persistent max-width="600px">
                                <v-card>
                                    <v-card-title>
                                    <span  vclass="headline">Edit Coordinates: {{roomCode}}</span>
                                    </v-card-title>
                                    <v-card-subtitle></v-card-subtitle>
                                    <v-card-text>
                                    <v-container>
                                        <!-- <v-row>
                                        <v-col cols="4" >
                                          <span>*Latitude:</span>  <v-text-field v-model.lazy="formLatitudeInput"    required hint="Enter Latitude" ></v-text-field>
                                        </v-col>
                                        <v-col cols="4" >
                                            <span>*Longitude:</span> <v-text-field v-model.lazy="formLongitudeInput"  required hint="Enter Longitude" ></v-text-field>
                                        </v-col>
                                        </v-row> -->
                                    </v-container>
                                    <small>*indicates required field</small>
                                    </v-card-text>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="editServiceDialog = false">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text  :disabled="validateCoordinates()" @click="editEditServiceDialog = false" >continue</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                          </v-col>
                    </v-card-actions>
              </v-row>
            </v-container>
          </v-card>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { infobaseApiCall } from '../../dummyapicals/InformationBase.js'
export default {
  data: () => ({
    editServiceDialog: false,
    buildingID: null,
    floorID: null,
    roomID: null,
    roomCode: null,
    servicesList: [],
    path: ''
  }),
  mounted () {
    this.buildingID = this.$route.params.bid
    this.floorID = this.$route.params.fid
    this.roomID = this.$route.params.rid
    this.path = '/informationbase/buildings/' + this.buildingID + '/floors/' + this.floorID + '/rooms/' + this.roomID + '/services'
    this.getServices()
  },
  methods: {
    getServices: function () {
      return new Promise((resolve, reject) => {
        infobaseApiCall({ url: this.path, method: 'GET' })
          .then(response => {
            resolve(this.servicesList = response.Service)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    validateCoordinates: function () {
      // /^[+-]?\d+(\.\d+)?$/
      if (this.formLongitudeInput != null && this.formLatitudeInput != null) {
        if (this.formLongitudeInput.match(/^([+-]?\d{1,3})[.](\d{0,4})$/) && this.formLatitudeInput.match(/^([+-]?\d{1,3})[.](\d{0,4})$/)) {
          return true
        }
      }
      return false
    }
  }
}
</script>

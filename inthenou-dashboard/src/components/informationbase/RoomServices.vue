<template>
 <v-layout row wrap align-center justify-center>
  <v-flex xs6 offset xs-1 sm6 offset-sm1 md6 offset-md1>
          <v-card class="d-flex ma-10 ">
             <v-container id="scroll-target" style="max-height: 700px" class="overflow-y-auto">
                 <v-row  style="height: 550px"  >
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
                          <v-col cols="12">
                            <v-dialog v-model="editServiceDialog" persistent max-width="600px">
                                <v-card>
                                    <v-card-subtitle></v-card-subtitle>
                                    <v-card-text>
                                    <v-container>
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
  </v-flex>
 </v-layout>
</template>

<script>
import { offset, limit, next, previous } from '../utils/methods.js'
export default {
  data: () => ({
    editServiceDialog: false,
    buildingID: null,
    floorID: null,
    roomID: null,
    roomCode: null,
    servicesList: [],
    path: '',
    offset,
    limit
  }),
  mounted () {
    this.buildingID = this.$route.params.bid
    this.floorID = this.$route.params.fid
    this.roomID = this.$route.params.rid
    this.getServices()
  },
  methods: {
    getServices: async function () {
      await fetch('https://inthenou.uprm.edu/Dashboard/Services/offset=' + this.offset + '/limit=' + this.limit)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.servicesList = data.Services
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
    },
    previous,
    next
  }
}
</script>

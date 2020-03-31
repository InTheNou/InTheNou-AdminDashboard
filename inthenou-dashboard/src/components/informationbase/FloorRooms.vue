<template>
  <v-card
    class="d-flex pa-2"
  >
    <v-container fluid>
      <v-row dense>
        <!-- <v-col
          v-for="room in roomsList"
          :key="room.RID"
          :cols="2"
        > -->
          <v-card class="d-flex pa-2">
            <v-container fluid>
              <v-row dense>
                <v-col v-for="room in roomsList" :key="room.RID" :cols="4">
                  <v-card>
                    <v-card-title class="headline blue darken-4 white--text"> {{room.rCode}}
                      <v-spacer></v-spacer>
                            <div class="text-right">
                                <v-btn @click="editCoorDialog = !editCoorDialog, roomID = room.RID, roomCode = room.rCode" color="primary mb-0 pa-0" dark class="mx-2" fab>
                                    <v-icon dark>mdi-pencil-box-outline</v-icon>
                                </v-btn>
                            </div>
                    </v-card-title>
                    <v-card-subtitle class="pt-0 pb-0 ma-0 blue accent-1">custodian: {{room.rCustodian}}, Name: {{room.bName}} </v-card-subtitle>
                    <v-card-text>
                    <v-card-subtitle class="pt-0 pb-0 ma-0">Occuopancy: {{room.Ocuppancy}} </v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0 ma-0" >Description: {{room.rDescription}} </v-card-subtitle>
                    </v-card-text>
                  </v-card>
                </v-col>
                    <v-card-actions>
                          <v-col cols="4">
                            <v-dialog v-model="editCoorDialog" persistent max-width="600px">
                                <v-card>
                                    <v-card-title>
                                    <span  vclass="headline">Edit Coordinates: {{roomCode}}</span>
                                    </v-card-title>
                                    <v-card-text>
                                    <v-container>
                                        <v-row>
                                        <v-col cols="4" >
                                          <span>*Latitude:</span>  <v-text-field v-model.lazy="formLatitudeInput" label="" required hint="Enter Latitude" ></v-text-field>
                                        </v-col>
                                        <v-col cols="4" >
                                            <span>*Longitude:</span> <v-text-field v-model.lazy="formLongitudeInput" label="" required hint="Enter Longitude" ></v-text-field>
                                        </v-col>
                                        </v-row>
                                    </v-container>
                                    <small>*indicates required field</small>
                                    </v-card-text>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="editCoorDialog = false">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text  :disabled="validateCoordinates()" @click="editCoorDialog = false" >continue</v-btn>
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
export default {
  data: () => ({
    editCoorDialog: false,
    validCoordinates: false,
    formLongitudeInput: null,
    formLatitudeInput: null,
    buildingID: null,
    roomID: null,
    roomCode: null,
    roomsList: [
      { RID: 1, rCode: 'S100', rFloor: 1, rDescription: 'some text', rOccupancy: 34, rCustodian: 'some email', bName: 'some name' },
      { RID: 2, rCode: 'S100', rFloor: 1, rDescription: 'some text', rOccupancy: 34, rCustodian: 'some email', bName: 'some name' },
      { RID: 3, rCode: 'S100', rFloor: 1, rDescription: 'some text', rOccupancy: 34, rCustodian: 'some email', bName: 'some name' },
      { RID: 4, rCode: 'S100', rFloor: 1, rDescription: 'some text', rOccupancy: 34, rCustodian: 'some email', bName: 'some name' },
      { RID: 5, rCode: 'S100', rFloor: 1, rDescription: 'some text', rOccupancy: 34, rCustodian: 'some email', bName: 'some name' }
    ]
  }),
  mounted () {
    this.buildingID = this.$route.params.bid
  },
  methods: {
    editCoordinates: function (longitude, latitude) {

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

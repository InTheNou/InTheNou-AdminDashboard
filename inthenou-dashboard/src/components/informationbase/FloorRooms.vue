<template>
<v-layout row wrap align-center justify-center>
  <v-flex xs6 offset xs-1 sm6 offset-sm1 md6 offset-md1>
  <v-card class="d-flex ma-10" >
                <v-container id="scroll-target" style="max-height: 700px" class="overflow-y-auto">
                 <v-row  style="height: 500px"  >
                  <v-list>
                    <v-list-item
                    v-for="room in roomsList.rooms"
                    :key="room.rid"
                    @click="followRoute(buildingID, floorID, room.rid)"
                    >
                    <v-list-item-content>
                      <v-divider> </v-divider>
                      <v-list-item-title>
                        Room: {{roomsList.building.babbrev}}-{{room.rcode}}
                      </v-list-item-title>
                       <v-list-item-title>
                        Roomid: {{room.RID}}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Saved Values: ({{room.rlatitude}}, {{room.rlongitude}}, {{room.raltitude}})
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
  </v-flex>
</v-layout>
</template>

<script>
export default {
  data: () => ({
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
    roomsList: []
  }),
  mounted () {
    this.buildingID = this.$route.params.bid
    this.floorID = this.$route.params.fid
    this.getRooms()
  },
  methods: {
    getRooms: async function () {
      await fetch('https://inthenou.uprm.edu/App/Rooms/bid=' + this.buildingID + '/rfloor=' + this.floorID)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.roomsList = data
          console.log(this.roomsList)
        })
    },
    editCoordinates: function (longitude, latitude, altitude) {

    },
    getCurrentCoordinates: function () {

    },
    validateCoordinates: function () {
      if (this.formLongitudeInput != null && this.formLatitudeInput != null) {
        if (this.formLongitudeInput.match(/^([+-]?\d{1,3})[.](\d{0,4})$/) && this.formLatitudeInput.match(/^([+-]?\d{1,3})[.](\d{0,4})$/)) {
          return true
        }
      }
      return false
    },
    followRoute: function (buildingid, floor, roomid) {
      console.log('follow route')
      this.$router.push('/informationbase/buildings/' + buildingid + '/floors/' + floor + '/rooms/' + roomid + '/services')
    }
  }
}
</script>

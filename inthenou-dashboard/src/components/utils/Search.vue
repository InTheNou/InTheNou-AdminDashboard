<template>
   <v-container style="max-width: 600px;">
    <v-row>
      <v-col cols="12" >
        <v-col cols="12" class="pa-0 text-center">
              <h1>
                {{searchType.toUpperCase()}} SEARCH
              </h1>
        </v-col>
      <v-card>
      <v-container id="scroll-target" style="max-height: 700px" class="overflow-y-auto">
          <v-row  style="height: 500px; max-width: 600px;" >
            <v-col>
            <v-list v-if="searchType === 'rooms'" v-model="roomsList">
              <v-list-item v-if="noDataAvailable">
                    <h2 class="text-center" style="height:100%; width:100%; align:center;"> ROOM SEARCH NOT FOUND... </h2>
              </v-list-item>
              <div v-else-if="roomsList != null">
              <v-list-item
              v-for="room in roomsList.rooms"
              :key="room.rid"
                @click="followRoomRoute(room.building.bid, room.rfloor, room.rid)" >
                    <v-list-item-content>
                    <v-divider> </v-divider>
                    <v-list-item-title>
                        Room: {{room.building.babbrev}}-{{room.rcode}}
                    </v-list-item-title>
                    <v-list-item-title>
                        Building: {{room.building.bname}}-{{room.rcode}}
                    </v-list-item-title>
                    <v-list-item-title>
                        Floor: {{room.rfloor}}
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
              </div>
            </v-list>

            <v-list v-if="searchType === 'buildings'" v-model="buildingsList">
                <v-list-item v-if="noDataAvailable">
                    <h2 class="text-center" style="height:100%; align:center;">BUILDING SEARCH NOT FOUND... </h2>
                </v-list-item>
                <div v-else-if="buildingsList != null">
                <v-list-item
                v-for="building in buildingsList"
                :key="building.bid"
                @click="followBuildingRoute(building.bid)"
                >
                <v-list-item-content>
                    <v-list-item-title>
                    {{building.bname}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                    Abbreviation: {{building.babbrev}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                    Floors: {{building.numfloors}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                    Common Name: {{building.bcommonname}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                    Type: {{building.btype}}
                    </v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>
                </div>
            </v-list>

            <v-list v-if="searchType === 'services'" v-model="servicesList">
              <v-list-item v-if="noDataAvailable">
                    <h2 class="text-center" style="height:100%; width:100%; align:center;">SERVICE SEARCH NOT FOUND... </h2>
                </v-list-item>
                <div v-else-if="servicesList != null">
                <v-list-item
                v-for="service in servicesList.services"
                :key="service.sid"
                @click="followServiceRoute(service.sid)"
                :cols="12">
                  <v-card width ="100%">
                    <v-card-title  style="font-size:1vw;">
                      {{service.sname}}
                    </v-card-title>
                    <v-card-subtitle>
                      Schedule: {{service.sschedule}}
                    </v-card-subtitle>
                    <v-card-text>
                    <v-card-subtitle class="pt-0 pb-0 ma-0" >
                      Description: {{service.sdescription}}
                    </v-card-subtitle>
                    </v-card-text>
                  </v-card>
                </v-list-item>
              </div>
            </v-list>
            </v-col>
          </v-row>
        </v-container>
    </v-card>
    </v-col>
    </v-row>
   </v-container>
</template>

<script>
export default {
  data: () => ({
    buildingsList: [],
    roomsList: [],
    servicesList: [],
    noDataAvailable: false
  }),
  computed: {
    searchType: function () {
      return this.$route.params.searchtype
    }
  },
  mounted () {
    if (this.$route.params.searchtype === 'buildings') {
      this.buildingSearch()
    } else if (this.$route.params.searchtype === 'rooms') {
      this.roomSearch()
    } else if (this.$route.params.searchtype === 'services') {
      this.serviceSearch()
    }
  },
  watch: {
    $route: async function () {
      if (this.$route.params.searchtype === 'buildings') {
        this.buildingSearch()
      } else if (this.$route.params.searchtype === 'rooms') {
        this.roomSearch()
      } else if (this.$route.params.searchtype === 'services') {
        this.serviceSearch()
      }
    }
  },
  methods: {
    followRoomRoute: function (buildingid, floor, roomid) {
      this.$router.push('/informationbase/buildings/' + buildingid + '/floors/' + floor + '/rooms/' + roomid + '/services')
    },
    followBuildingRoute: function (bid) {
      this.$router.push('/informationbase/buildings/' + bid)
    },
    followServiceRoute: function (sid) {
      this.$router.push('/informationbase/servicedetails/' + sid)
    },
    buildingSearch: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_BUILDING_SEARCH_1 + this.$route.params.keyword + process.env.VUE_APP_BUILDING_SEARCH_2 + 0 + process.env.VUE_APP_BUILDING_SEARCH_3 + 600)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          if (data === null || data.length <= 0) {
            this.noDataAvailable = true
          } else {
            this.noDataAvailable = false
            this.buildingsList = data.buildings
          }
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    },
    roomSearch: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_ROOM_SEARCH_1 + this.$route.params.keyword + process.env.VUE_APP_ROOM_SEARCH_2 + 0 + process.env.VUE_APP_ROOM_SEARCH_3 + 600)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          if (data.rooms === null || data.rooms === '') {
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
    serviceSearch: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_SERVICE_SEARCH_1 + this.$route.params.keyword + process.env.VUE_APP_SERVICE_SEARCH_2 + 0 + process.env.VUE_APP_SERVICE_SEARCH_3 + 600)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          if (data.services === null || data.services === '') {
            this.noDataAvailable = true
          } else {
            this.noDataAvailable = false
            this.servicesList = data
          }
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    }
  }
}
</script>

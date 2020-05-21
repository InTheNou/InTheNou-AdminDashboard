<template>
 <v-layout row wrap align-center justify-center>
  <v-flex xs6 offset xs-1 sm6 offset-sm1 md6 offset-md1>
    <v-text-field
            v-model.lazy="search"
            flat
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Services ..."
            class="pb-2"
          />
          <v-card v-if="noDataAvailable">
            <v-row  align="center" justify="center">
              <v-container >
                <h2 class="text-center" style="height:100%; align:center;"> NO SERVICES AVAILABLE  AT THE MOMENT </h2>
              </v-container>
            </v-row>
          </v-card>
          <v-card v-else>
          <v-col cols="12">
             <v-container id="scroll-target" style="max-height: 700px" class="overflow-y-auto">
                <v-row
                v-model="filteredServicesList"
                  style="height: 550px"  >
                <v-list>
                <v-list-item
                v-for="service in filteredServicesList"
                :key="service.sid"
               @click="followRoute(service.sid)">
                  <v-list-item-content style="width: 100%;">
                    <v-divider> </v-divider>
                    <v-list-item-title  style="font-size:1vw;">
                      {{service.sname}}
                    </v-list-item-title>
                    <v-list-item-subtitle >
                      Schedule: {{service.sschedule}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="pt-0 pb-0 ma-0" >
                      Description: {{service.sdescription}}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </v-list>
                 </v-row>
             </v-container>
          </v-col>
          </v-card>
  </v-flex>
 </v-layout>
</template>

<script>
export default {
  data: () => ({
    noDataAvailable: false,
    roomID: null, // room ID
    servicesList: [],
    filteredServicesList: [],
    path: '',
    search: ''
  }),
  watch: {
    search: function () {
      console.log('started search')
      var newServicesList = []
      if (this.search.length > 0) {
        for (var i = 0; i < this.servicesList.length; i++) {
          console.log('building: ' + this.servicesList[i].sname + 'search: ' + this.search.toLowerCase())
          if (((this.servicesList[i].sname).toLowerCase()).includes(this.search.toLowerCase().trim())) {
            newServicesList.push(this.servicesList[i])
          }
        }
        if (newServicesList.length === 0) {
          this.noDataAvailable = true
        } else {
          this.noDataAvailable = false
        }
        this.filteredServicesList = newServicesList
      } else {
        this.filteredServicesList = this.servicesList
      }
    },
    servicesList: function () {
      this.filteredServicesList = this.servicesList
    }
  },
  mounted () {
    // this.buildingID = this.$route.params.bid
    // this.floorID = this.$route.params.fid
    this.roomID = this.$route.params.rid
    this.fetchServices()
  },
  methods: {
    /**
     * void : fetch all services of a room using the roomID variable instance of the Vue instance then assign the response value to servicesList instance
     * error: generates a Dialog in case of error notifying the user
     */
    fetchServices: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_GET_ROOM_SERVICES_1 + this.roomID + process.env.VUE_APP_GET_ROOM_SERVICES_2)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          if (data.services === null || data.services === undefined) {
            this.noDataAvailable = true
          } else {
            this.noDataAvailable = false
            this.servicesList = data.services
          }
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    },
    followRoute: function (sid) {
      this.$router.push('/informationbase/servicedetails/' + sid)
    }
  }
}
</script>

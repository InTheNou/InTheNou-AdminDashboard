<template>
    <v-container style="max-width: 600px;">
    <v-row>
      <v-col>
          <v-card v-if="noDataAvailable">
            <v-row  align="center" justify="center">
              <v-container >
                <h2 class="text-center" style="height:100%; align:center;"> NO SERVICES AVAILABLE  AT THE MOMENT </h2>
              </v-container>
            </v-row>
          </v-card>
             <v-container v-else id="scroll-target" style="max-height: 700px" class="overflow-y-auto">
                <v-col
                :cols="12">
                  <v-card height="100%" style="text-start black--text">
                    <v-card-title class="headline blue darken-4 white--text" style="font-size:1vw;">
                      <h6>{{service.sname}}</h6>
                    </v-card-title>
                    <v-img height="200" :src= "(service.photourl==null? 'https://via.placeholder.com/250' : service.photourl)" ></v-img>
                    <v-card-subtitle class="pt-0 pb-0 ma-0">
                      Schedule: {{service.sschedule}}
                    </v-card-subtitle>
                    <v-card-text>
                    <v-expansion-panels flat>
                      <v-expansion-panel>
                        <v-expansion-panel-header class="pt-0 pl-0">website</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-card-subtitle style="height: 100px" class="pt-0 pb-0  ma-0 text--primary overflow-y-auto" >
                             <v-row v-if="service.websites.length ==0">
                              <v-col
                                class="ma-0 pa-0"
                                 v-for="website in service.websites"
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
                             <v-row v-else>
                              <p>Service has no phones at the moment</p>
                            </v-row>
                            </v-card-subtitle>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-expansion-panels flat>
                      <v-expansion-panel>
                        <v-expansion-panel-header class="pt-0 pl-0">Phones</v-expansion-panel-header>
                          <v-expansion-panel-content>
                           <v-row v-if="service.numbers.length == 0">
                             <v-col
                              class="ma-0 pa-0"
                              v-for="phone in service.numbers"
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
                            <v-row v-else>
                              <p>Service has no phones at the moment</p>
                            </v-row>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <v-expansion-panels flat>
                      <v-expansion-panel>
                        <v-expansion-panel-header class="pt-0 pl-0">Description</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-card-subtitle style="height: 100px" class="pt-0 pb-0  ma-0 text--primary overflow-y-auto" >
                             {{service.sdescription}}
                            </v-card-subtitle>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    </v-card-text>
                  </v-card>
                </v-col>
             </v-container>
      </v-col>
    </v-row>
    </v-container>
</template>

<script>
export default {
  data: () => ({
    noDataAvailable: false,
    service: { numbers: '', room: { building: { babbrev: '', bcommonname: '', bid: 1, bname: '', btype: '', distinctfloors: [], numfloors: 0, photourl: '' }, photourl: '', raltitude: 50.04, rcode: '', rcustodian: '', rdept: '', rdescription: '', rfloor: 0, rid: 0, rlatitude: 18.209641, rlongitude: -67.139923, roccupancy: 0 }, sdescription: '', sid: 0, sname: '', sschedule: '', websites: '' },
    filteredServicesList: [],
    formInputPhoneNumber: null,
    search: ''
  }),
  mounted () {
    this.fetchService()
  },
  methods: {
    /**
     * void : fetch all services of a room using the roomID variable instance of the Vue instance then assign the response value to servicesList instance
     * error: generates a Dialog in case of error notifying the user
     */
    fetchService: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_GET_SERVICE_BY_ID + this.$route.params.sid)
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
            this.service = data
            if (this.service.numbers === null || this.service.numbers === undefined) this.service.numbers = []
            if (this.service.websites === null || this.service.websites === undefined) this.service.websites = []
          }
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    }
  }
}
</script>

<template
        id="scroll-target"
        style="max-height: 400px"
        class="overflow-y-auto">
        <v-row>
      <v-container v-if="event !== null && event !== undefined" class="pt-0" style="max-width: 600px;">
           <v-col
           style="height: 500px">
          <v-col cols="12" class="pa-0 text-center">
            <v-spacer>
              <h1 class="title">
              {{($route.params.eventtype == 'allcurrentevents' ?  'Current Events' : $route.params.eventtype == 'alleventsarchive' ? 'Events Archive' : $route.params.eventtype == 'alldeletedevents' ? 'Deleted Events' : $route.params.eventtype == 'myevents' ? 'My Events' : ' ' )}}
              </h1>
            </v-spacer>
          </v-col>
          <v-card class="pa-2 " style="text-start">
            <v-container>
              <v-row>
                  <v-card height="100%" width="100%" class="card">
                    <v-card-subtitle class="headline white--text font" style="background-color:#24324f;">
                      <p class="title-font">{{event.etitle}}</p>
                    </v-card-subtitle>
                    <v-expansion-panels flat popout>
                    <v-expansion-panel>
                      <v-expansion-panel-header class="pb-0 pl-4">Image</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-img height="350"  :src= "(event.photourl==null? 'https://via.placeholder.com/250' : event.photourl)" ></v-img>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    </v-expansion-panels>
                    <v-container id="scroll-target" style="max-height: 300px" class="overflow-y-auto pt-0">
                      <v-row >
                        <v-card-text height="200" class="text-left  pt-0 pb-0 card-text">
                        <v-card-subtitle class="pt-0 pb-0 ma-0 "><p>Created: {{formatDate(event.ecreation)}}</p></v-card-subtitle>
                        <v-card-subtitle class="pt-0 pb-0 ma-0 "><p>Status: {{(isPastDate(event.estart)&&isPastDate(event.eend)&&event.estatus !="deleted"? 'past' : event.estatus !="deleted"? 'Upcoming' : 'deleted')}}</p></v-card-subtitle>
                        <v-card-subtitle class="pt-0 pb-0 ma-0 "><p>Creator: {{event.ecreator.display_name}}</p></v-card-subtitle>
                        <v-card-subtitle class="pt-0 pb-0 ma-0 "><p>Email: {{event.ecreator.email}}</p></v-card-subtitle>
                        <v-card-subtitle  class="pt-0 pb-0 ma-0 ">
                          <p>Building: {{event.room.building.bname}}</p>
                        </v-card-subtitle>
                        <v-card-subtitle  class="pt-0 pb-0 ma-0">
                         <p>Room: {{event.room.building.babbrev}}-{{event.room.rcode}}<p/>
                        </v-card-subtitle>
                        <v-card-subtitle class="pt-0 pb-0 ma-0 " ><p>Start: {{formatDate(event.estart)}} </p></v-card-subtitle>
                        <v-card-subtitle class="pt-0 pb-0 ma-0 " ><p>End: {{formatDate(event.eend)}} </p></v-card-subtitle>
                        <v-card-subtitle style="height: 100px" class="pt-0 pb-0  ma-0  overflow-y-auto" >
                          <p>Description:</p>
                          <p>{{event.edescription}}</p>
                        </v-card-subtitle>
                        </v-card-text>
                      </v-row>
                    </v-container>
                    <v-card-actions class="card-actions">
                      <v-spacer />
                    <v-btn v-if="(event.estatus === 'active' && !isPastDate(event.eend) && isAuthorized)" @click="dialog=true, eventTitleToRemove=event.etitle" :disabled="!isAuthorized" large bottom right color="#ff3e4c">
                      <v-icon v-bind="size" color="#ffffff" dark>Delete </v-icon>
                    </v-btn>
                    </v-card-actions>
                  </v-card>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
    </v-container>
    <v-dialog v-model="dialog" scrollable max-width="500px">
      <v-card>
        <v-card-title>Are you sure you want to delete the event?</v-card-title>
        <v-card-title>{{eventTitleToRemove}}</v-card-title>
        <v-card-actions>
          <v-btn color="#ff3e4c" text @click="dialog = false">Cancel</v-btn>
          <v-btn class="continuebtn" color="#24324f"  text @click="refresh">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>
</template>

<script>
import { deleteEvent, formatDate, isPastDate } from './events.js'
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    isAuthorized: false,
    eventTitleToRemove: null,
    dialog: false,
    event: { ecreation: '', ecreator: { display_name: '', email: '', roleid: 0, type: '', uid: 1 }, edescription: '', eend: '2020-05-14 12:30:00', eid: 0, estart: '2020-05-14 12:30:00', estatus: '', estatusdate: '', etitle: '', photourl: '', room: { building: { babbrev: '', bcommonname: '', bid: 0, bname: '', btype: '', distinctfloors: [], numfloors: 0, photourl: '' }, photourl: '', raltitude: 50.04, rcode: '', rcustodian: '', rdept: '', rdescription: '', rfloor: 0, rid: 0, rlatitude: 18.209641, rlongitude: -67.139923, roccupancy: 0 }, tags: [], websites: '' }
  }),
  computed: {
    ...mapGetters([
      'uid',
      'roleid'
    ]),
    /**
     *
     */
    eventApiPath: function () {
      return process.env.VUE_APP_API_HOST + process.env.VUE_APP_GET_EVENT_BY_ID + this.$route.params.eid
    },
    /**
     *
     */
    deleteEventApiPath: function () {
      return process.env.VUE_APP_API_HOST + process.env.VUE_APP_DELETE_EVENT_1 + this.$route.params.eid + process.env.VUE_APP_DELETE_EVENT_3 + 'deleted'
    }
  },
  async mounted () {
    await this.fetchEvent()
    await this.isAuthorizedToDelete()
  },
  methods: {
    deleteEvent,
    formatDate,
    isPastDate,
    refresh: function () {
      this.deleteEvent()
      window.history.back()
    },
    fetchEvent: async function () {
      await fetch(this.eventApiPath)
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
            this.event = data
          }
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    },
    /**
     * Verifies if the current user is authorise to delete the event
     * if so set the isAuthorized variable to true
     */
    isAuthorizedToDelete: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_DELEGATED_USERS_1 + this.uid + process.env.VUE_APP_DELEGATED_USERS_2)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          if ((data.users !== null || data.users !== undefined)) {
            for (var i = 0; i < data.users.length; i++) {
              if ((this.event.ecreator.uid).toString() === (data.users[i].uid.toString()) || (this.event.ecreator.uid).toString() === this.uid.toString() || this.roleid.toString() === '4') {
                this.isAuthorized = true
              } else if ((this.event.ecreator.uid).toString() !== this.uid.toString()) {
                this.isAuthorized = false
              }
            }
          }
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error)
        })
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 700px) {

  p.title-font {
    font-size: 6vw;
  }
  .card-text div> p {
    margin: 0%;
    font-size: 4vw;
    color:black;
  }
}
  @media only screen and (min-width: 700px) {
  .title {
    margin: 0;
  }
  .card-text div> p {
    margin: 0%;
    color:black;
  }
}
</style>

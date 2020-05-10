<template
        id="scroll-target"
        style="max-height: 400px"
        class="overflow-y-auto">
        <v-row>
  <!-- <v-layout row wrap align-center justify-center>
  <v-flex xs6 offset xs-1 sm6 offset-sm1 md6 offset-md1> -->
      <v-container class="pt-0" style="max-width: 600px;">
           <v-col
           style="height: 500px">
          <v-col cols="12" class="pa-0 text-center">
            <v-spacer>
              <p class="title">
              {{($route.params.eventtype == 'allcurrentevents' ?  'Current Events' : $route.params.eventtype == 'alleventsarchive' ? 'Events Archive' : $route.params.eventtype == 'alldeletedevents' ? 'Deleted Events' : $route.params.eventtype == 'myevents' ? 'My Events' : ' ' )}}
              </p>
            </v-spacer>
          </v-col>
          <v-card class="pa-2 " style="text-start">
            <v-container>
              <v-row >
                  <v-card height="100%" width="100%" class="card">
                    <v-card-subtitle class="headline blue darken-4 white--text font">
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
                        <v-card-subtitle  class="pt-0 pb-0 ma-0 ">
                          <p>Building: {{event.room.building.bname}}</p>
                        </v-card-subtitle>
                        <v-card-subtitle  class="pt-0 pb-0 ma-0">
                         <p>Room: {{event.room.building.babbrev}}-{{event.room.rcode}}<p/>
                        </v-card-subtitle>
                        <v-card-subtitle class="pt-0 pb-0 ma-0 " ><p>Start: {{formatDate(event.estart)}}</p></v-card-subtitle>
                        <v-card-subtitle class="pt-0 pb-0 ma-0 " ><p>End: {{formatDate(event.eend)}}</p></v-card-subtitle>
                        </v-card-text>
                        <v-expansion-panels flat >
                        <v-expansion-panel>
                        <v-expansion-panel-header class="pt-0 pl-8"><p>Description</p></v-expansion-panel-header>
                        <v-expansion-panel-content class="card-text">
                        <v-card-subtitle style="height: 100px" class="pt-0 pb-0  ma-0  overflow-y-auto" >
                          <p>{{event.edescription}}</p>
                          </v-card-subtitle>
                        </v-expansion-panel-content>
                        </v-expansion-panel>
                        </v-expansion-panels>
                      </v-row>
                    </v-container>
                    <v-card-actions class="card-actions">
                      <v-spacer />
                    <v-btn @click="dialog=true, eventIDToRemove=event.eid, eventTitleToRemove=event.etitle" large bottom right color="primary">
                      Delete
                    </v-btn>
                    </v-card-actions>
                  </v-card>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
    </v-container>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>Delete event:</v-card-title>
        <v-card-title>{{eventTitleToRemove}}</v-card-title>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn class="continuebtn" color="blue darken-1"  text @click="deleteEvent">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>
  <!-- </v-flex>
  </v-layout> -->
</template>

<script>
import { getEvents, previous, next, deleteEvent, formatDate } from './events.js'
export default {
  data: () => ({
    eventIDToRemove: null,
    eventTitleToRemove: null,
    offset: 0,
    limit: 6,
    dialog: false,
    listofevents: [],
    disablenext: false,
    disableprev: true,
    event: { }
  }),
  computed: {
    /**
     *
     */
    eventsApiPath: function () {
      return process.env.VUE_APP_API_HOST + process.env.VUE_APP_CURRENT_EVENTS_1 + this.offset + process.env.VUE_APP_CURRENT_EVENTS_2 + this.limit
    },
    /**
     *
     */
    deleteEventApiPath: function () {
      return process.env.VUE_APP_API_HOST + process.env.VUE_APP_DELETE_EVENT_1 + this.eventIDToRemove + process.env.VUE_APP_DELETE_EVENT_3 + 'deleted'
    }
  },
  async mounted () {
    this.fetchEvent()
  },
  methods: {
    getEvents,
    previous,
    next,
    deleteEvent,
    formatDate,
    fetchEvent: async function () {
      await fetch(process.env.VUE_APP_API_HOST + '/API/App/Events/eid=' + this.$route.params.eid)
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

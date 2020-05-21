<template
        id="scroll-target"
        style="max-height: 600px"
        class="overflow-y-auto">
  <v-row>
      <v-container>
        <v-col
          v-scroll:#scroll-target="onScroll"
          align="center"
          justify="center"
          style="height: 1000px"
        >
        <v-col cols="12">
          <v-spacer><h1>User Events</h1></v-spacer>
        </v-col>
          <v-card-actions>
            <v-btn justify="start"  color="#24324f" dark @click="previous()"><v-icon large right color="#ffffff">mdi-arrow-left-bold</v-icon ></v-btn>
            <v-spacer>
            <v-col cols="2" class="pt-8 ma-auto">
               <v-select
               v-model="limit"
                :items="[3,6,12,18]"
                dense
                outlined >
               </v-select>
               </v-col>
            </v-spacer>
            <v-btn  color="#24324f" dark @click="next()"><v-icon large right color="#ffffff">mdi-arrow-right-bold</v-icon></v-btn>
          </v-card-actions>
          <v-card
            class="d-flex pa-2"
          >
            <v-container v-if="listofevents.length === 0" fluid>
              <v-row dense>
                <v-col>
                  <h3>User does not have created events at the moment</h3>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-else fluid>
              <v-row dense>
                <v-col
                  v-for="event in listofevents"
                  :key="event.EID"
                  :cols="4"
                >
                   <v-card height="100%" class="card">
                    <v-card-subtitle class="headline white--text font" style="background-color:#24324f;">
                      {{event.etitle}}
                    </v-card-subtitle>
                      <v-img height="150" :src= "(event.photourl==null? 'https://via.placeholder.com/250' : event.photourl)" ></v-img>
                    <v-card-text height="200" class="text-left  pt-0 pb-0 card-text">
                    <v-card-subtitle class="pt-0 pb-0 ma-0"><p>Status: {{(isPastDate(event.estart)&&isPastDate(event.eend)? 'past' : event.estatus !="deleted"? 'Upcoming' : 'deleted')}}</p></v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0 ma-0"><p>Created: {{formatDate(event.ecreation)}}</p></v-card-subtitle>
                    <v-card-subtitle  class="pt-0 pb-0 ma-0">
                      <p>
                      Building: {{event.room.building.bname}}
                      </p>
                    </v-card-subtitle>
                    <v-card-subtitle  class="pt-0 pb-0 ma-0">
                      <p>
                      Room: {{event.room.building.babbrev}}-{{event.room.rcode}}
                      </p>
                    </v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0 ma-0" ><p>Start: {{formatDate(event.estart)}}</p></v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0 ma-0" ><p>End: {{formatDate(event.eend)}}</p></v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0  ma-0" ><p>Description: {{event.edescription}}</p></v-card-subtitle>
                    </v-card-text>
                    <v-card-actions v-if="event.estatus === 'active' && !isPastDate(event.eend)" class="card-actions">
                      <v-spacer />
                    <v-btn @click="dialog=true, eidtoremove=event.eid, etitletoremove=event.etitle" large bottom right color="#ff3e4c">
                      <v-icon v-bind="size" color="#ffffff" dark> Delete </v-icon>
                    </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-card-actions>
            <v-btn justify="start"  color="#24324f" dark @click="previous()"><v-icon large right color="#ffffff">mdi-arrow-left-bold</v-icon></v-btn>
            <v-spacer></v-spacer>
            <v-btn  color="#24324f" dark @click="next()"><v-icon large right color="#ffffff">mdi-arrow-right-bold</v-icon></v-btn>

          </v-card-actions>
        </v-col>
    </v-container>
    <v-dialog v-model="dialog" scrollable max-width="500px">
      <v-card>
        <v-card-title>Are you sure you want to delete the event?</v-card-title>
        <v-card-title>{{etitletoremove}}</v-card-title>
        <v-card-actions>
          <v-btn color="#ff3e4c" text @click="dialog = false">Cancel</v-btn>
          <v-btn class="continuebtn" color="#24324f"  text @click="deleteEvent">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { fetchEvents, previous, next, deleteEvent, formatDate, isPastDate } from './events.js'
export default {
  data: () => ({
    eidtoremove: null,
    etitletoremove: null,
    offset: 0,
    limit: 6,
    dialog: false,
    listofevents: []
  }),
  computed: {
    eventsApiPath: function () {
      return process.env.VUE_APP_API_HOST + process.env.VUE_APP_GET_USERS_EVENTS_1 + this.$route.params.uid + process.env.VUE_APP_GET_USERS_EVENTS_2 + this.offset + process.env.VUE_APP_GET_USERS_EVENTS_3 + this.limit
    },
    deleteEventApiPath: function () {
      return process.env.VUE_APP_API_HOST + process.env.VUE_APP_DELETE_EVENT_1 + this.eidtoremove + process.env.VUE_APP_DELETE_EVENT_3 + 'deleted'
    }
  },
  async mounted () {
    // this.uid = this.$route.params.uid
    // this.path = '/Events/User/' + this.uid
    // this.path1 = '/Events/Myevents/size'
    this.listofevents = await this.fetchEvents()
  },
  methods: {
    fetchEvents,
    deleteEvent,
    previous,
    next,
    formatDate,
    isPastDate
  },
  watch: {
    limit: async function () {
      this.listofevents = await this.fetchEvents()
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

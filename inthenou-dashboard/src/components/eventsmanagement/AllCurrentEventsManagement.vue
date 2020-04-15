<template
        id="scroll-target"
        style="max-height: 600px"
        class="overflow-y-auto">
  <v-row>
      <v-container>
        <v-col  justify="center" style="height: 1000px" >
          <v-card-actions>
            <v-btn justify="start" rounded color="primary" dark @click="previous()"><v-icon large right>mdi-skip-previous</v-icon> <h1 class="ml-4">Previous</h1> </v-btn>
            <v-spacer align="center"><h1>All Current Events</h1></v-spacer>
            <v-btn rounded color="primary" :disabled="disablenext" @click="next()"> <h1 class="ml-10 mr-10">Next</h1><v-icon large right>mdi-skip-next</v-icon></v-btn>
          </v-card-actions>
          <v-card class="d-flex pa-2">
            <v-container fluid>
              <v-row dense>
                <v-col
                v-for="event in listofevents"
                :key="event.eid"
                :cols="4">
                  <v-card height="100%">
                    <v-card-subtitle class="headline blue darken-4 white--text font">
                      {{event.etitle}}
                    </v-card-subtitle>
                      <v-img height="150" :src= "(event.photourl==null? 'https://via.placeholder.com/250' : event.photourl)" ></v-img>
                    <v-card-text>
                    <v-card-subtitle class="pt-0 pb-0 ma-0">Created: {{formatDate(event.ecreation)}}</v-card-subtitle>
                    <v-card-subtitle  class="pt-0 pb-0 ma-0">
                      Building: {{event.room.building.bname}}
                    </v-card-subtitle>
                    <v-card-subtitle  class="pt-0 pb-0 ma-0">
                      Room: {{event.room.building.babbrev}}-{{event.room.rcode}}
                    </v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0 ma-0" >Start: {{formatDate(event.estart)}} </v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0 ma-0" >End: {{formatDate(event.eend)}} </v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0  ma-0" >Description: {{event.edescription}} </v-card-subtitle>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                    <v-btn @click="dialog=true, eidtoremove=event.eid, etitletoremove=event.etitle" large  color="primary">
                      Delete
                    </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-card-actions>
            <v-btn justify="start" rounded color="primary" :disabled="disableprev" @click="previous(path)"><v-icon large right>mdi-skip-previous</v-icon> <h1 class="ml-4">Previous</h1> </v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded color="primary"   :disabled="disablenext" @click="next(path)"> <h1 class="ml-10 mr-10">Next</h1><v-icon large right>mdi-skip-next</v-icon></v-btn>
          </v-card-actions>
        </v-col>
    </v-container>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>Delete event:</v-card-title>
        <v-card-title>{{etitletoremove}}</v-card-title>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn class="continuebtn" color="blue darken-1"  text @click="deleteEvent">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { getEvents, previous, next, deleteEvent, formatDate } from '../vueinstances/events.js'
export default {
  data: () => ({
    uid: null,
    eidtoremove: null,
    etitletoremove: null,
    offset: 0,
    limit: 6,
    dialog: false,
    listofevents: [],
    path: '',
    path1: '',
    disablenext: false,
    disableprev: false
  }),
  async mounted () {
    this.path = 'https://inthenou.uprm.edu/Dashboard/Events'
    this.listofevents = await this.getEvents(this.path, this.offset, this.limit)
    console.log('here')
  },
  methods: {
    getEvents,
    previous,
    next,
    deleteEvent,
    formatDate
  }
}
</script>

<style scoped>
.font {
  font-size: 1vw;
}
</style>

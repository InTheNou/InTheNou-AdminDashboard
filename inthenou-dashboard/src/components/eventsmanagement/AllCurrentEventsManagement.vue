<template
        id="scroll-target"
        style="max-height: 600px"
        class="overflow-y-auto">
  <v-row>
      <v-container>
        <v-col v-scroll:#scroll-target="onScroll" align="center" justify="center" style="height: 1000px" >
          <v-card-actions>
            <v-btn justify="start" rounded color="primary" dark @click="previous()"><v-icon large right>mdi-skip-previous</v-icon> <h1 class="ml-4">Previous</h1> </v-btn>
            <v-spacer><h1>All Current Events</h1></v-spacer>
            <v-btn rounded color="primary" dark @click="next()"> <h1 class="ml-10 mr-10">Next</h1><v-icon large right>mdi-skip-next</v-icon></v-btn>
          </v-card-actions>
          <v-card class="d-flex pa-2">
            <v-container fluid>
              <v-row dense>
                <v-col v-for="event in listofevents" :key="event.EID" :cols="4">
                  <v-card height="100%">
                    <v-card-title class="headline blue darken-4 white--text"> {{event.eTitle}}
                      <v-spacer></v-spacer>
                      <v-btn large text color="grey">
                          <v-icon  large right @click="dialog=true, eidtoremove=event.EID, etitletoremove=event.eTitle" >mdi-delete-forever</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-subtitle class="pt-0 pb-0 ma-0 blue accent-1">Created: {{event.CreationDate}}</v-card-subtitle>
                      <v-img height="150" :src= "event.ePhoto" ></v-img>
                    <v-card-text>
                    <v-card-subtitle class="pt-0 pb-0 ma-0">Location: {{event.Room}}</v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0 ma-0" >Start: {{event.eStartTime}} </v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0 ma-0" >End: {{event.eEndTime}} </v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0  ma-0" >Description: {{event.eDescription}} </v-card-subtitle>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-card-actions>
            <v-btn justify="start" rounded color="primary" dark @click="previous()"><v-icon large right>mdi-skip-previous</v-icon> <h1 class="ml-4">Previous</h1> </v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded color="primary" dark @click="next()"> <h1 class="ml-10 mr-10">Next</h1><v-icon large right>mdi-skip-next</v-icon></v-btn>
          </v-card-actions>
        </v-col>
    </v-container>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>delete event:</v-card-title>
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
import { onScroll, getEvents, getNumberOfEvents, previous, next, uid, offsetTop, eidtoremove, etitletoremove, offset, limit, dialog, deleteEvent, listofevents, path, path1 } from '../vueinstances/events.js'
export default {
  data: () => ({
    uid,
    offsetTop,
    eidtoremove,
    etitletoremove,
    offset,
    limit,
    dialog,
    listofevents,
    path,
    path1
  }),
  mounted () {
    this.path1 = '/Events/size'
    this.path = '/Events'
    this.listofevents = this.getEvents(this.offset, this.limit)
  },
  methods: {
    onScroll,
    getEvents,
    getNumberOfEvents,
    previous,
    next,
    deleteEvent
  }
}
</script>

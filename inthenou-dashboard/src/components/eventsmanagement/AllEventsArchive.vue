<template
  id="scroll-target"
  style="max-height: 600px"
  class="overflow-y-auto">
  <v-row>
      <v-container>
        <v-col
          align="center"
          justify="center"
          style="height: 1000px"
        >
         <v-col cols="12">
          <v-spacer><h1>All Events Archive</h1></v-spacer>
         </v-col>
          <v-card-actions>
            <v-btn justify="start" rounded color="primary" dark @click="previous()"><v-icon large right>mdi-skip-previous</v-icon> <h1 class="ml-4">Previous</h1> </v-btn>
             <v-spacer>
               <v-col cols="2" class="pt-8 ma-auto">
               <v-select
               v-model="limit"
                :items="[6,12,18]"
                dense
                outlined >
               </v-select>
               </v-col>
             </v-spacer>
            <v-btn rounded color="primary" dark @click="next()"> <h1 class="ml-10 mr-10">Next</h1><v-icon large right>mdi-skip-next</v-icon></v-btn>
          </v-card-actions>
          <v-card
            class="d-flex pa-2"
          >
            <v-container fluid>
              <v-row dense>
                <v-col
                  v-for="event in listofevents"
                  :key="event.EID"
                  :cols="4"
                >
                  <v-card height="100%">
                    <v-card-title class="headline blue-grey darken-4 white--text"> {{event.etitle}}</v-card-title>
                    <v-card-subtitle class="pt-0 pb-0 ma-0 blue accent-1">Created: {{formatDate(event.ecreation)}}</v-card-subtitle>
                    <v-img height="150" :src= "(event.photourl==null? 'https://via.placeholder.com/250' : event.photourl)" ></v-img>
                    <v-card-text>
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
  </v-row>
</template>

<script>
import { getEvents, previous, next, formatDate } from '../vueinstances/events.js'
export default {
  data: () => ({
    offset: 0,
    limit: 6,
    listofevents: [],
    path: ''
  }),
  async mounted () {
    this.path = process.env.VUE_APP_API_HOST + process.env.VUE_APP_EVENTS_ARCHIVE_1 + this.offset + process.env.VUE_APP_EVENTS_ARCHIVE_2 + this.limit
    console.log(this.path)
    this.listofevents = await this.getEvents(this.path)
    console.log(this.listofevents)
  },
  methods: {
    getEvents,
    previous,
    next,
    formatDate
  }
}
</script>

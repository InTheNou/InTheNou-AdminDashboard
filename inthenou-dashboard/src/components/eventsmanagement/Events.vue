<template>
<v-container style="max-width: 600px;">
  <v-row>
  <v-col align="center"
          justify="center"
          style="height: 500px">
    <v-container fluid class="pa-0">
      <v-row align="center">
          <v-col cols="12" class="pa-0">
              <h1>
                  {{($route.params.eventtype == 'allcurrentevents' ?  'Current Events' : $route.params.eventtype == 'alleventsarchive' ? 'Events Archive' : $route.params.eventtype == 'alldeletedevents' ? 'Deleted Events' : $route.params.eventtype == 'myevents' ? 'My Events' : ' ' )}}
              </h1>
          </v-col>
        <v-col cols="4" class="pa-0">
          <v-container>
              <v-btn  justify="start"  color="#24324f" style="max-width: 97%;" v-bind="size"  :disabled="disableprev" @click="previous(currentEventsApiPath)">
                <v-icon color="#ffffff">mdi-arrow-left-bold</v-icon>
                </v-btn>
          </v-container>
        </v-col>
        <v-col class="pa-0">
          <v-select
          class="pt-8"
            v-model="limit"
            :items="[3,6,12,18]"
            label="quantity"
            dense
            outlined >
          </v-select>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-container>
              <v-btn color="#24324f" v-bind="size" style="max-width: 97%;" :disabled="disablenext" @click="next(currentEventsApiPath)">
                <v-icon color="#ffffff">mdi-arrow-right-bold</v-icon>
               </v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-card>
      <v-container id="scroll-target" style="max-height: 450px" class="overflow-y-auto text-start">
          <v-row   style="height: 450px">
              <v-container>
                <v-row style="height: 450px" >
                  <v-list v-model="listofevents" style="width: 100%;">
                    <v-list-item v-if="listofevents === null || listofevents.length == 0">
                      <h2 class="text-center" style="height:100%; align:center;">No events at the moment...</h2>
                    </v-list-item>
                    <v-col v-else-if="listofevents != null" cols="12">
                      <v-list-item
                      v-for=" event in listofevents"
                      :key="event.eid"
                      @click="followRoute(event.eid)">
                        <v-list-item-content style="width: 100%;">
                          <v-divider> </v-divider>
                          <v-list-item-title>
                            {{event.etitle}}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            Building: {{event.room.building.bname}}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>
                            Room: {{event.room.building.babbrev}}-{{event.room.rcode}}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>
                            Start: {{formatDate(event.estart)}}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>
                            End: {{formatDate(event.eend)}}
                          </v-list-item-subtitle>
                          <v-divider></v-divider>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-list>
                </v-row>
            </v-container>
          </v-row>
      </v-container>
    </v-card>
  </v-col>
  </v-row>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchEvents, previous, next, formatDate } from './events.js'
export default {
  data: () => ({
    offset: 0,
    limit: 6,
    listofevents: [],
    disablenext: false,
    disableprev: true
  }),
  computed: {
    ...mapGetters([
      'uid'
    ]),
    /**
     *
     */
    eventsApiPath: function () {
      if (this.$route.params.eventtype === 'allcurrentevents') {
        return process.env.VUE_APP_API_HOST + process.env.VUE_APP_CURRENT_EVENTS_1 + this.offset + process.env.VUE_APP_CURRENT_EVENTS_2 + this.limit
      } else if (this.$route.params.eventtype === 'alleventsarchive') {
        return process.env.VUE_APP_API_HOST + process.env.VUE_APP_EVENTS_ARCHIVE_1 + this.offset + process.env.VUE_APP_EVENTS_ARCHIVE_2 + this.limit
      } else if (this.$route.params.eventtype === 'alldeletedevents') {
        return process.env.VUE_APP_API_HOST + process.env.VUE_APP_DELETED_EVENTS_1 + this.offset + process.env.VUE_APP_DELETED_EVENTS_2 + this.limit
      } else if (this.$route.params.eventtype === 'myevents') {
        return process.env.VUE_APP_API_HOST + process.env.VUE_APP_USER_EVENTS_1 + this.offset + process.env.VUE_APP_USER_EVENTS_2 + this.limit
      } else if (this.$route.params.eventtype === 'userevents') {
        return process.env.VUE_APP_API_HOST + process.env.VUE_APP_USER_EVENTS_1 + this.$route.params.uid + process.env.VUE_APP_USER_EVENTS_2 + this.offset + process.env.VUE_APP_USER_EVENTS_3 + this.limit
      } else return ''
    },
    size: function () {
      const size = { xs: 'x-small', sm: 'small', lg: 'large', xl: 'x-large' }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    }
  },
  watch: {
    limit: async function () {
      this.listofevents = await this.fetchEvents()
    },
    $route: async function () {
      this.offset = 0
      this.limit = 6
      this.disablenext = false
      this.disableprev = true
      this.listofevents = await this.fetchEvents()
    }
  },
  async mounted () {
    this.listofevents = await this.fetchEvents()
  },
  methods: {
    fetchEvents,
    previous,
    next,
    formatDate,
    followRoute: function (eid) {
      this.$router.push('/eventsmanagement/eventdetails/' + this.$route.params.eventtype + '/event/' + eid)
    }
  }
}
</script>

<style scoped>
.font {
  font-size: 1vw;
}
.card {
  position: relative;
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>

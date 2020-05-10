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
              <v-btn  justify="start"  color="primary" style="max-width: 97%;" v-bind="size"  :disabled="disableprev" @click="previous(currentEventsApiPath)">
                <v-icon>mdi-arrow-left-bold</v-icon>
                <!-- <h1 class="ml-4">Previous</h1> -->
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
              <v-btn color="primary" v-bind="size" style="max-width: 97%;" :disabled="disablenext" @click="next(currentEventsApiPath)">
                <v-icon>mdi-arrow-right-bold</v-icon>
               <!-- <h1 class="ml-10 mr-10">Next</h1> -->
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
                    <v-list-item v-if="noDataAvailable">
                      <h2 class="text-center" style="height:100%; align:center;">ROOM SEARCH NOT FOUND... </h2>
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
                            Start: {{formatDate(event.estart)}},  End: {{formatDate(event.eend)}}
                          </v-list-item-subtitle>
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
export default {
  data: () => ({
    offsetTop: 0,
    eventIDToRemove: null,
    eventTitleToRemove: null,
    offset: 0,
    limit: 6,
    dialog: false,
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
        return process.env.VUE_APP_API_HOST + process.env.VUE_APP_USER_EVENTS_1 + this.uid + process.env.VUE_APP_USER_EVENTS_2 + this.offset + process.env.VUE_APP_USER_EVENTS_3 + this.limit
      } else if (this.$route.params.eventtype === 'userevents') {
        return process.env.VUE_APP_API_HOST + process.env.VUE_APP_USER_EVENTS_1 + this.$route.params.uid + process.env.VUE_APP_USER_EVENTS_2 + this.offset + process.env.VUE_APP_USER_EVENTS_3 + this.limit
      } else return ''

    //   return process.env.VUE_APP_API_HOST + process.env.VUE_APP_CURRENT_EVENTS_1 + this.offset + process.env.VUE_APP_CURRENT_EVENTS_2 + this.limit
    },
    /**
     *
     */
    deleteEventApiPath: function () {
      return process.env.VUE_APP_API_HOST + process.env.VUE_APP_DELETE_EVENT_1 + this.eventIDToRemove + process.env.VUE_APP_DELETE_EVENT_3 + 'deleted'
    },
    size: function () {
      const size = { xs: 'x-small', sm: 'small', lg: 'large', xl: 'x-large' }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    }
  },
  watch: {
    limit: async function () {
      this.listofevents = await this.getEvents()
    },
    $route: async function () {
      this.offset = 0
      this.limit = 6
      this.disablenext = false
      this.disableprev = true
      this.listofevents = await this.getEvents()
    }
  },
  async mounted () {
    this.listofevents = await this.getEvents()
  },
  methods: {
    getEvents: async function () {
      var newList
      await fetch(this.eventsApiPath)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
          newList = data.events
        })
      return newList
    },
    deleteEvent: async function () {
      await fetch(
        this.deleteEventApiPath,
        {
          method: 'POST',
          mode: 'cors',
          credential: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .catch()
        .then(response => {
          console.log(response)
          // response.headers.forEach(console.log)
          return response.json()
        })
        .then(data => {
        })
      this.listofevents = await this.getEvents()
      this.dialog = false
    },
    previous: async function () {
      if ((this.offset - this.limit) >= 0) {
        if (this.disablenext) this.disablenext = !this.disablenext
        this.offset -= this.limit
        this.listofevents = await this.getEvents()
      } else {
        this.disableprev = !this.disableprev
      }
    },
    next: async function () {
      this.offset += this.limit
      var newList = await this.getEvents()
      if (newList == null || newList.length <= 0) {
        this.offset -= this.limit
        this.disablenext = !this.disablenext
      } else {
        this.disableprev = (this.disableprev ? !this.disableprev : this.disableprev)
        this.listofevents = newList
      }
    },
    formatDate: function (date) {
      var day = date.substring(8, 10)
      var month = date.substring(5, 7)
      var year = date.substring(0, 4)
      var hour = (date.substring(10, 13) < 12 ? (date.substring(10, 13) % 12 || 12) + ':' + date.substring(14, 16) + ' AM' : (date.substring(10, 13) % 12 || 12) + ':' + date.substring(14, 16) + ' PM')

      return (' ' + day + '/' + month + '/' + year + ', ' + hour)
    },
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

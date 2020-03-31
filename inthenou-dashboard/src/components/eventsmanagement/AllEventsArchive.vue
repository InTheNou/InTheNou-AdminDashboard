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
          <v-card-actions>
            <v-btn justify="start" rounded color="primary" dark @click="previous()"><v-icon large right>mdi-skip-previous</v-icon> <h1 class="ml-4">Previous</h1> </v-btn>
            <v-spacer></v-spacer>
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
                  <v-card>
                    <v-card-title class="headline blue-grey darken-4 white--text"> {{event.eTitle}}</v-card-title>
                    <v-card-subtitle class="pt-0 pb-0 ma-0 blue accent-1">Created: {{event.CreationDate}}</v-card-subtitle>
                      <v-img
                        height="150"
                        :src= "event.ePhoto"
                      ></v-img>
                    <v-card-text>
                    <v-card-subtitle class="pt-0 pb-0 ma-0">Location: {{event.Room}}</v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0 ma-0" >Start: {{event.eStartTime}} </v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0 ma-0" >End: {{event.eEndTime}} </v-card-subtitle>
                    <v-card-subtitle class="pt-0 pb-0  ma-0">Description: {{event.eDescription}} </v-card-subtitle>
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
export default {
  data: () => ({
    offsetTop: 0,
    offset: 0,
    limit: 5,
    dialog: false,
    listofevents: [],
    remotedummyeventlist: [
      { EID: 'E1', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
      { EID: 'E2', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1574170609519-d1d8d4b71f60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
      { EID: 'E3', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
      { EID: 'E4', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
      { EID: 'E5', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
      { EID: 'E6', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
      { EID: 'E7', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
      { EID: 'E8', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
      { EID: 'E9', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
      { EID: 'E10', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' }
    ]
  }),
  mounted () {
    this.listofevents = this.getEvents(this.offset, this.limit)
  },
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    getEvents: function (offset, limit) {
      // Route: /Events/{IgnoreFirst:INT}/{GetRows:INT}
      var listtoreturn = []
      for (var i = offset; (i < offset + limit) && (i < this.remotedummyeventlist.length); i++) {
        if (this.remotedummyeventlist[i] != null) listtoreturn.push(this.remotedummyeventlist[i])
      }
      return listtoreturn
    },
    getNumberOfEvents: function () {
      return this.remotedummyeventlist.length
    },
    previous: function () {
      //
      if ((this.offset - this.limit) >= 0) this.offset -= this.limit
      if ((this.offset - this.limit) > 0) this.offset -= this.limit
      this.listofevents = this.getEvents(this.offset, this.limit)
    },
    next: function () {
      //
      console.log('here offset = ' + this.offset)
      console.log('offset + limit' + this.offset + this.limit)
      console.log(this.listofevents)
      console.log('thisgetNumberOfEvents' + this.getNumberOfEvents())
      if ((this.offset + this.limit) < this.getNumberOfEvents()) this.offset += this.limit
      console.log('updated offset = ' + this.offset)
      console.log('limit = ' + this.limit)
      console.log(this.getEvents(this.offset, this.limit))
      this.listofevents = this.getEvents(this.offset, this.limit)
    }

  }
}
</script>

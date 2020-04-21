<template>
    <v-layout row wrap align-center justify-center>
  <v-flex xs6 offset xs-1 sm6 offset-sm1 md6 offset-md1>
        <v-col cols="12" >
          <v-card>
            <v-card-title class="headline indigo darken-4 white--text ">{{building.bname}}</v-card-title>
            <v-img height="200" :src= "(building.photourl==null? 'https://via.placeholder.com/250' : building.photourl)" ></v-img>
            <hr>
            <v-card-subtitle class="pt-0 pb-0  ma-0">Abbreviation: {{building.babbrev}} </v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Floors: {{building.numfloors}} </v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Common Name: {{building.bcommonname}} </v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Type: {{building.btype}} </v-card-subtitle>
            <hr>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
           <v-list>
            <v-list-group value="true">
            <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Floors</v-list-item-title>
            </v-list-item-content>
           </template>
           <v-container id="scroll-target" style="max-height: 200px" class="overflow-y-auto">
           <v-row  style="height: 500px"  >
            <v-list-item
            v-for=" floor in building.distinctfloors"
            :key="floor"
            cols="12"
            @click="followRoute(building.bid, floor)"
            >
            <v-list-item-content>
              <v-divider ></v-divider>
              <v-list-item-title>
                Floor: {{floor}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
           </v-row>
           </v-container>
          </v-list-group>
        </v-list>
          </v-card>
        </v-col>
  </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    bid: null,
    building: []
  }),
  mounted () {
    this.bid = this.$route.params.bid
    this.getBuildings()
  },
  methods: {
    getBuildings: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_BUILDINGS_DETAIL + this.bid)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.building = data
          // console.log(data)
        })
    },
    followRoute: function (bid, floor) {
      this.$router.push('/informationbase/buildings/' + bid + '/floors/' + floor + '/rooms')
    }

  }
}
</script>

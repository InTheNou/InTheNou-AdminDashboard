<template>
    <v-container style="max-width: 600px; text-start">
      <v-row dense>
        <v-col
          style="height: 500px">
          <v-card dense style="text-start">
            <v-card-title class="headline white--text " style="background-color:#24324f;">
              <h6>{{building.bname}}</h6>
              </v-card-title>
            <v-img height="200" :src= "(building.photourl==null? 'https://via.placeholder.com/250' : building.photourl)" ></v-img>
            <hr>
            <v-card-text height="200" class="text-left  pt-0 pb-0 card-text">
            <v-card-subtitle class="pt-0 pb-0  ma-0"><p>Abbreviation: {{building.babbrev}}</p></v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0"><p>Floors: {{building.numfloors}}</p></v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0"><p>Common Name: {{building.bcommonname}}</p></v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0"><p>Type: {{building.btype}}</p></v-card-subtitle>
            </v-card-text>
            <hr>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
           <v-list>
            <v-list-group value="false">
            <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Floors</v-list-item-title>
            </v-list-item-content>
           </template>
           <v-container id="scroll-target" style="max-height: 200px" class="overflow-y-auto">
           <v-row  style="height: 350px"  >
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
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    bid: null,
    building: []
  }),
  /**
   *
   */
  mounted () {
    this.bid = this.$route.params.bid
    this.fetchBuilding()
  },
  methods: {
    /**
     *
     */
    fetchBuilding: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_BUILDINGS_DETAIL + this.bid)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.building = data
        })
    },
    /**
     *
     */
    followRoute: function (bid, floor) {
      this.$router.push('/informationbase/buildings/' + bid + '/floors/' + floor + '/rooms')
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

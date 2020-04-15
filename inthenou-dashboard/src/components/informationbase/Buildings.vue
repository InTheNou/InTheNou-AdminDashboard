<template>
<v-layout row wrap align-center justify-center>
  <v-flex xs6 offset xs-1 sm6 offset-sm1 md6 offset-md1>
  <v-container id="scroll-target" style="max-height: 600px" class="overflow-y-auto">
  <v-row  style="height: 500px"  >
  <v-col cols="10" >
  <v-card>
        <v-list>
          <v-list-item
          v-for="building in buildings"
          :key="building.bid"
          @click="followRoute(building.bid)"
          >
          <v-list-item-content>
            <v-list-item-title>
              {{building.bname}}
            </v-list-item-title>
             <v-list-item-subtitle>
              Abbreviation: {{building.babbrev}}
             </v-list-item-subtitle>
             <v-list-item-subtitle>
              Floors: {{building.numfloors}}
             </v-list-item-subtitle>
            <v-list-item-subtitle>
              Common Name: {{building.bcommonname}}
             </v-list-item-subtitle>
             <v-list-item-subtitle>
              Type: {{building.btype}}
             </v-list-item-subtitle>
          </v-list-item-content>
          </v-list-item>
        </v-list>
  </v-card>
  </v-col>
  </v-row>
  </v-container>
  </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    buildings: [],
    buildingOffset: 0,
    builingLimit: 10,
    listOfBuildings: null,
    path: ''
  }),
  mounted () {
    this.path = '/informationbase/buildings'
    this.getBuildings()
  },
  methods: {
    getBuildings: async function () {
      await fetch('https://inthenou.uprm.edu/App/Buildings/offset=' + this.buildingOffset + '/limit=' + this.builingLimit)
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((data) => {
          this.buildings = data
          console.log(data)
        })
    },
    followRoute: function (bid) {
      this.$router.push('/informationbase/buildings/' + bid)
    }

  }
}
</script>

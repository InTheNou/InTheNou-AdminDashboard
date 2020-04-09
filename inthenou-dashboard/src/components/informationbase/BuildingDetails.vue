<template>
  <v-card
    class="d-flex pa-2"
  >
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="building in buildings"
          :key="building.BID"
          :cols="3"
        >
          <v-card>
            <v-card-title class="headline indigo darken-4  ">Name: {{building.Name}}</v-card-title>
            <v-img height="150" :src= "building.bPhoto" ></v-img>
            <v-card-subtitle class="pt-0 pb-0  ma-0">Abbreviation: {{building.Abbreviation}} </v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Floors: {{building.NumFloors}} </v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Coomon Name: {{building.CommonName}} </v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Type: {{building.Type}} </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <router-link :to="'/informationbase/buildings/'+ building.BID +'/floors/'+building.NumFloors"><v-btn large color="primary">Floors</v-btn></router-link>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { infobaseApiCall } from '../../dummyapicals/InformationBase.js'
export default {
  data: () => ({
    buildings: [],
    buildingOffset: null,
    builingLimit: null,
    listOfBuildings: null,
    path: ''
  }),
  mounted () {
    this.path = '/informationbase/buildings'
    this.getBuildings()
  },
  methods: {
    getBuildings: async function () {
      return new Promise((resolve, reject) => {
        infobaseApiCall({ url: this.path, method: 'GET' })
          .then(response => {
            resolve(this.buildings = response.Building)
          })
          .catch(err => {
            reject(err)
          })
      })
    }

  }
}
</script>

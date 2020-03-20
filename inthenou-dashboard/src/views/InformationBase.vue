<template>
  <v-card
    class="d-flex pa-2"
  >
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="building in buildings"
          :key="building.BID"
          :cols="12"
        >
          <v-card >
            <v-card-title class="headline">Name: {{building.Name}}</v-card-title>
            <v-card-subtitle class="pt-0 pb-0  ma-0">Abbreviation: {{building.Abbreviation}} </v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Floors: {{building.NumFloors}} </v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Coomon Name: {{building.CommonName}} </v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Type: {{building.Type}} </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large color="primary" route: to="/buildingfloors">More Info</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>


<script>
  export default {
    data: () => ({
      buildings: [
        { BID: 31,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"},
        { BID: 32,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"},      
        { BID: 33,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"},
        { BID: 34,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"},
        { BID: 35,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"}
      ]
  }),
  }
</script>
Discover
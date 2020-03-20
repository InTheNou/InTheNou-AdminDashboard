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
              <v-btn large color="primary">More Info</v-btn>
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
        { BID: 1,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"},
        { BID: 2,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"},      
        { BID: 3,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"},
        { BID: 4,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"},
        { BID: 5,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"}
      ]
  }),
  }
</script>
Discover
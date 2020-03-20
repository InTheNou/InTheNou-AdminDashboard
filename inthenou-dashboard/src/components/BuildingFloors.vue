<template>
  <v-card
    class="d-flex pa-2"
  >
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="floor in floors"
          :key="floor.FID"
          :cols="12"
        >
          <v-card >
            <v-card-title class="headline">Building: {{floor.Name}}</v-card-title>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Floor: {{floor.FloorNum}} </v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Rooms: {{floor.NumRooms}} </v-card-subtitle>
            
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
      floors: [
        { FID: 1,Name: "Stefanie", FloorNum: 0, NumRooms: "60"},
        { FID: 2,Name: "Stefanie", FloorNum: 1, NumRooms: "60"},      
        { FID: 3,Name: "Stefanie", FloorNum: 2, NumRooms: "60"},
        { FID: 4,Name: "Stefanie", FloorNum: 3, NumRooms: "60"},
        { FID: 5,Name: "Stefanie", FloorNum: 4, NumRooms: "60"}
      ]
  }),
  }
</script>
Discover
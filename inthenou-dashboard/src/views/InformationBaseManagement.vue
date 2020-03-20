<template>
<div>
  <v-container

      class="grey lighten-5 mb-6"
    >
      <v-row
        align ="center"
        justify="center"
        no-gutters
        style="height: 150px;"
      >
        <v-col cols="4" >
          <v-card
            class="pa-2"
            outlined
            tile
          >
           <v-card class="justify-center" >

            
            <v-img src="https://image.flaticon.com/icons/svg/857/857676.svg" aspect-ratio="1.7" contain></v-img>
            <v-card-title class="headline justify-center" >Building</v-card-title>
           
            <v-card-actions class="justify-center" >
              <v-btn large color="primary" route: to="/" fab><h1>+</h1></v-btn>
            </v-card-actions>
          </v-card>
          </v-card>
          
        </v-col>
                <v-col cols="4" >
          <v-card
            class="pa-2"
            outlined
            tile
          >
           <v-card class="justify-center" >

            
            <v-img src="https://image.flaticon.com/icons/svg/515/515159.svg" aspect-ratio="1.7" contain></v-img>
            <v-card-title class="headline justify-center" >Room</v-card-title>
           
            <v-card-actions class="justify-center" >
              <v-btn large color="primary" route: to="/" fab><h1>+</h1></v-btn>
            </v-card-actions>
          </v-card>
          </v-card>
          
        </v-col>
                <v-col cols="4" >
          <v-card
            class="pa-2"
            outlined
            tile
          >
           <v-card class="justify-center" >

            
            <v-img src="https://image.flaticon.com/icons/svg/950/950299.svg" aspect-ratio="1.7" contain></v-img>
            <v-card-title class="headline justify-center" >Service</v-card-title>
           
            <v-card-actions class="justify-center" >
              <v-btn large color="primary" route: to="/" fab><h1>+</h1></v-btn>
            </v-card-actions>
          </v-card>
          </v-card>
          
        </v-col>
      </v-row>
      
    </v-container>


 </div> 
</template>

<script>
  export default {
    data: () => ({
      buildings: [
        { BID: 41,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"},
        { BID: 42,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"},      
        { BID: 43,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"},
        { BID: 44,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"},
        { BID: 45,Name: "Stefanie",Abbreviation: "S", NumFloors: 6, CommonName: "stef",  Type: "no administrativo"}
      ]
  }),
  }
</script>
Discover
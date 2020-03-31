<template>
  <v-card
    class="d-flex pa-2"
  >
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for=" floornumber in numfloors"
          :key="floornumber"
          :cols="12"
        >
          <v-card >
            <v-card-title class="headline">Floor: {{floornumber}}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
               <router-link :to=" '/informationbase/buildings/'+building + '/floors/' + floornumber + '/rooms' "><v-btn large color="primary">Floor Rooms</v-btn></router-link>
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
    building: null,
    numfloors: null
  }),
  mounted () {
    this.building = this.$route.params.bid
    console.log(this.$route.params.bid)
    // this would be a get for the number of floors of the current building
    this.numfloors = 4
  }
}
</script>

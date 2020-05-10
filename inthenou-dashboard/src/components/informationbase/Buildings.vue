<template>
  <!-- <template
  id="scroll-target"
  style="max-height: 600px"
  class="overflow-y-auto"> -->
   <!-- <v-layout row wrap align-center justify-center>
  <v-flex xs6 offset xs-1 sm6 offset-sm1 md6 offset-md1> -->
  <v-container style="max-width: 600px;">
    <v-row>
  <v-col align="center"
    justify="center"
    style="height: 500px" >
  <v-col cols="12" class="pa-0">
      <h1>UPRM BUILDINGS</h1>
    </v-col>
  <v-text-field
            v-model.lazy="search"
            flat
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Buildings ..."
            class="pb-2"
          />
  <v-card>
    <v-container id="scroll-target" style="max-height: 400px" class="overflow-y-auto text-start">
      <v-row
        v-model="filteredServicesList"
        style="height: 400px" >
        <v-list v-model="filteredBuildingsList">
          <v-list-item
          v-for="building in filteredBuildingsList"
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
      </v-row>
    </v-container>
  </v-card>
  </v-col>
   </v-row>
  </v-container>
  <!-- </v-flex>
   </v-layout> -->
</template>

<script>
export default {
  data: () => ({
    buildings: [],
    filteredBuildingsList: [],
    buildingOffset: 0,
    builingLimit: 1000,
    listOfBuildings: null,
    path: '',
    search: ''
  }),
  watch: {
    search: function () {
      console.log('started search')
      var newBuildingsList = []
      if (this.search.length > 0) {
        for (var i = 0; i < this.buildings.length; i++) {
          console.log('building: ' + this.buildings.bname + 'search: ' + this.search.toLowerCase())
          if (((this.buildings[i].bname).toLowerCase()).includes(this.search.toLowerCase().trim())) {
            newBuildingsList.push(this.buildings[i])
          }
        }
        if (newBuildingsList.length === 0) {
          this.noDataAvailable = true
        } else {
          this.noDataAvailable = false
        }
        this.filteredBuildingsList = newBuildingsList
      } else {
        this.filteredBuildingsList = this.buildings
      }
    },
    buildings: function () {
      this.filteredBuildingsList = this.buildings
    }
  },
  mounted () {
    this.path = '/informationbase/buildings'
    this.getBuildings()
  },
  methods: {
    getBuildings: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_BUILDINGS_1 + this.buildingOffset + process.env.VUE_APP_BUILDINGS_2 + this.builingLimit)
        .then((response) => {
          // console.log(response)
          return response.json()
        })
        .then((data) => {
          this.buildings = data
          // console.log(data)
        })
    },
    followRoute: function (bid) {
      this.$router.push('/informationbase/buildings/' + bid)
    },
    previous: async function () {
      if ((this.offset - this.limit) >= 0) {
        if (this.disablenext) this.disablenext = !this.disablenext
        this.offset -= this.limit
        this.listofevents = await this.getEvents()
      } else {
        this.disableprev = !this.disableprev
      }
    },
    next: async function () {
      this.offset += this.limit
      var newList = await this.getEvents()
      if (newList == null || newList.length <= 0) {
        this.offset -= this.limit
        this.disablenext = !this.disablenext
      } else {
        this.disableprev = (this.disableprev ? !this.disableprev : this.disableprev)
        this.listofevents = newList
      }
    }
  }
}
</script>

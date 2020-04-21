<template>
   <v-content>
     <nav-bar></nav-bar>
    <building-floors></building-floors>
   </v-content>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import BuildingDetails from '../components/informationbase/BuildingDetails.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'building-floors': BuildingDetails
  },
  mounted () {
    // console.log('at building floors view ')
  }
}
</script>

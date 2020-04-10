<template>
   <div>
    <nav-bar></nav-bar>
    <building-floors></building-floors>
   </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import BuildingFloors from '../components/informationbase/BuildingFloors.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'building-floors': BuildingFloors
  },
  mounted () {
    // console.log('at building floors view ')
  }
}
</script>

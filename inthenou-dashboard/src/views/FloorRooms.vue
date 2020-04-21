<template>
    <v-content>
      <nav-bar></nav-bar>
        <floor-rooms></floor-rooms>
    </v-content>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import FloorRooms from '../components/informationbase/FloorRooms.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'floor-rooms': FloorRooms
  }
}
</script>

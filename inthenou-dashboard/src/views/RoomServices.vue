<template>
    <v-content>
      <nav-bar></nav-bar>
      <room-services></room-services>
    </v-content>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import RoomServices from '../components/informationbase/RoomServices.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'room-services': RoomServices
  }
}
</script>

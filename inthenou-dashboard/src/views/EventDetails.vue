<template>
   <v-content>
     <nav-bar></nav-bar>
    <room-deatil-view></room-deatil-view>
   </v-content>
</template>

<script>
import Navbar from '../components/utils/Navbar.vue'
import RoomDetails from '../components/eventsmanagement/EventDetails.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'room-deatil-view': RoomDetails
  }
}
</script>

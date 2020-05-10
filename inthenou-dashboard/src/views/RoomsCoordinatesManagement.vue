<template>
    <v-content>
      <nav-bar></nav-bar>
      <rooms-coordinates-management-view></rooms-coordinates-management-view>
    </v-content>
</template>
<script>
import Navbar from '../components/utils/Navbar.vue'
import RoomsCoordinatesManagement from '../components/informationbasemanagement/RoomsCoordinatesManagement.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'rooms-coordinates-management-view': RoomsCoordinatesManagement
  }
}
</script>

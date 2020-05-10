<template>
  <v-content>
    <nav-bar></nav-bar>
    <events-view></events-view>
  </v-content>
</template>

<script>
import Navbar from '../components/utils/Navbar.vue'
import Events from '../components/eventsmanagement/Events.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'events-view': Events
  }
}
</script>

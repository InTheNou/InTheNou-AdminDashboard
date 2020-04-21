<template>
  <v-content>
    <nav-bar></nav-bar>
    <all-current-events-view enableEventDelete='true'></all-current-events-view>
  </v-content>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import AllCurrentEvents from '../components/eventsmanagement/AllCurrentEventsManagement'
export default {
  components: {
    'nav-bar': Navbar,
    'all-current-events-view': AllCurrentEvents
  }
}
</script>

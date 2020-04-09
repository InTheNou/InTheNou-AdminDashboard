<template>
<div>
  <nav-bar></nav-bar>
  <v-content>
    <all-current-events-view enableEventDelete='true'></all-current-events-view>
  </v-content>
</div>
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

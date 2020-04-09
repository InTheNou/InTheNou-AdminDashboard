<template>
<div>
  <nav-bar></nav-bar>
  <v-content>
    <all-events-archive-view></all-events-archive-view>
  </v-content>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import AllCurrentEvents from '../components/eventsmanagement/AllEventsArchive.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'all-events-archive-view': AllCurrentEvents
  }
}
</script>

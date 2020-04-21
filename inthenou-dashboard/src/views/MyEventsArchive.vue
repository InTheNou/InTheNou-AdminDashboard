<template>
  <v-content>
    <nav-bar></nav-bar>
    <my-events-archive></my-events-archive>
  </v-content>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import MyEventsArchive from '../components/eventsmanagement/MyEventsArchive.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'my-events-archive': MyEventsArchive
  }
}
</script>

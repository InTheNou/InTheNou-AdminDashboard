<template>
<v-content>
  <nav-bar></nav-bar>
  <user-events></user-events>
</v-content>
</template>

<script>
import Navbar from '../components/utils/Navbar.vue'
import UserEvents from '../components/eventsmanagement/UserEvents'
export default {
  components: {
    'nav-bar': Navbar,
    'user-events': UserEvents
  }
}
</script>

<template>
<v-content>
<nav-bar></nav-bar>
<my-events></my-events>
</v-content>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import MyEvents from '../components/eventsmanagement/MyEvents.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'my-events': MyEvents
  }
}
</script>

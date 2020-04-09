<template>
<div>
<nav-var></nav-var>
<user-events></user-events>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import UserEvents from '../components/eventsmanagement/UserEvents'
export default {
  components: {
    'nav-var': Navbar,
    'user-events': UserEvents
  }
}
</script>

<template>
<div>
<nav-var></nav-var>
<my-events></my-events>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import MyEvents from '../components/eventsmanagement/MyEvents.vue'
export default {
  components: {
    'nav-var': Navbar,
    'my-events': MyEvents
  }
}
</script>

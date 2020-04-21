<template>
  <v-content>
    <nav-bar></nav-bar>
    <all-buildings-view></all-buildings-view>
  </v-content>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Buildings from '../components/informationbase/Buildings.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'all-buildings-view': Buildings
  }
}
</script>

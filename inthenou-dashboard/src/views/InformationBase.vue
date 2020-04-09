<template>
<div>
  <nav-bar></nav-bar>
  <v-content>
    <all-buildings-view></all-buildings-view>
  </v-content>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Buildings from '../components/informationbase/BuildingDetails.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'all-buildings-view': Buildings
  }
}
</script>

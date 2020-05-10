<template>
    <v-content>
      <nav-bar></nav-bar>
      <search-view></search-view>
    </v-content>
</template>
<script>
import Navbar from '../components/utils/Navbar.vue'
import Search from '../components/utils/Search.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'search-view': Search
  }
}
</script>

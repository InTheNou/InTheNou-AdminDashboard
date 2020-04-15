<template>
<div>
  <nav-bar></nav-bar>
  <v-content>
  </v-content>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  components: {
    'nav-bar': Navbar
  },
  data: () => ({
    uid: null
  }),
  mounted () {
    this.uid = this.$route.params.uid
    document.cookie = 'uid=' + this.uid
  }
}
</script>

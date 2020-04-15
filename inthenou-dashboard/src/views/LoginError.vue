<template>
<div>
<login-error></login-error>
  <v-content>
  </v-content>
</div>
</template>

<script>
import LoginError from '../components/auth/LoginError.vue'
export default {
  components: {
    'login-error': LoginError
  },
  data: () => ({
    uid: null
  }),
  mounted () {
    // this.uid = this.$route.params.uid
    // document.cookie = 'uid=' + this.uid
  }
}
</script>

<template>
    <v-btn dense v-bind="size" @click="logout"  color="grey">
            <GoogleLogin :params="params" :logoutButton=true @click="logout()">Logout</GoogleLogin>
    </v-btn>
</template>

<script>
import GoogleLogin from 'vue-google-login'
export default {
  data: () => ({
    params: { client_id: process.env.VUE_APP_CLIENT_ID }
  }),
  computed: {
    size: function () {
      const size = { xs: 'x-small', sm: 'small', lg: 'large', xl: 'x-large' }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('AUTH_LOGOUT')
        .catch()
        .then(() => { // creates promise triggers Action inside store
          this.$router.push('/') // push to the login screen
        })
    }
  },
  components: {
    GoogleLogin
  }
}
</script>

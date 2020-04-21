<template>
    <v-btn @click="logout" text color="grey">
            <GoogleLogin :params="params" :logoutButton=true @click="logout()"><v-btn>Logout</v-btn></GoogleLogin>
            <v-icon right></v-icon>
    </v-btn>
</template>

<script>
import GoogleLogin from 'vue-google-login'
export default {
  data: () => ({
    params: { client_id: process.env.VUE_APP_CLIENT_ID }
  }),
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

<template>
    <v-btn dense v-bind="size" @click="logout"  color="#ff3e4c">
            <GoogleLogin :params="params" :logoutButton=true :onSuccess="onSuccess">Logout</GoogleLogin>
    </v-btn>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import Vue from 'vue'
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
    onSuccess: async function () {
      await Vue.GoogleAuth.then(auth2 => {
        auth2.signOut()
      })
      await fetch(
        process.env.VUE_APP_API_HOST + process.env.VUE_APP_LOGOUT,
        {
          method: 'POST',
          mode: 'cors',
          credential: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          return response.json()
        })
        .then(data => {
          // console.log('logout' + data)
          return data
        })
      this.$store.dispatch('AUTH_LOGOUT')
      this.$router.push('/') // push to the login screen
    }
  },
  components: {
    GoogleLogin
  }
}
</script>

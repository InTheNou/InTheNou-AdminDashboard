<template>
<v-container class="fill-height">
<nav>
  <v-app-bar text app color = "#24324f">
    <v-toolbar-title class="text-uppercase grey--text">
      <span  style="color:#afbec8;"><h1>In<span style="color:#ff3e4c;">The</span>Nou</h1></span>
    </v-toolbar-title>
  </v-app-bar >
</nav>
  <v-row align="center" justify="center">
    <v-col cols="12">
    <h4> You need to be registered and have administartor or moderator privileges to use the dashboard</h4>
    <h4> Please register through InTheNou APP and ask for access</h4>
    <v-btn dense v-bind="size" @click="logout"  color="grey">
            <GoogleLogin :params="params" :logoutButton=true :onSuccess="onSuccess">Logout</GoogleLogin>
    </v-btn>
    </v-col>
  </v-row>
</v-container>
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
      this.$store.dispatch('AUTH_LOGOUT')
      this.$router.push('/') // push to the login screen
    }
  },
  components: {
    GoogleLogin
  }
}
</script>

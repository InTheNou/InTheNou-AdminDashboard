<template>
<v-container class="fill-height">
<nav>
  <v-app-bar text app color = "blue darken-4">
    <v-toolbar-title class="text-uppercase grey--text">
      <h1>In<span style="color:red">The</span>Nou</h1>
    </v-toolbar-title>
  </v-app-bar >
</nav>
  <v-row align="center" justify="center">
    <v-col cols="2">
    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
// import axios from 'axios'
import GoogleLogin from 'vue-google-login'
export default {
  data: () => ({
    user: {
      access_token: null,
      id: null,
      email: '',
      display_name: ''
    },
    params: { client_id: process.env.VUE_APP_CLIENT_ID },
    renderParams: { width: 250, height: 50, longtitle: true }
  }),
  components: {
    GoogleLogin
  },
  methods: {
    onSuccess: function (googleUser) {
      // console.log(googleUser)
      this.user.access_token = googleUser.tc.access_token
      this.user.id = googleUser.Pt.MU
      this.user.email = googleUser.Pt.yu
      this.user.display_name = googleUser.Pt.Ad
      // console.log(JSON.stringify(this.user))
      this.sendSessionToDB()
    },
    onFailure: function () {
    },
    sendSessionToDB: async function () {
      /** Body of the POST API call ***
      {"access_token":"ACCESTOKENCODE;",
      "id":"113768707919850641968",
      "email":"jonathan.santiago27@upr.edu",
      "display_name": "Jonathan X Santiago Gonzalez"
      } */
      // console.log('login: ' + process.env.VUE_APP_API_HOST + process.env.VUE_APP_LOGIN)
      return await fetch(
        process.env.VUE_APP_API_HOST + process.env.VUE_APP_LOGIN,
        {
          method: 'POST',
          mode: 'cors',
          credential: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.user)
        })
        .catch()
        .then(response => {
          // console.log(response)
          // response.headers.forEach(console.log)
          return response.json()
        })
        .then(data => {
          this.$store.dispatch('AUTH_REQUEST', data.uid).then(() => {
            console.log('here')
            // this.$router.push('/allcurrentevents')
          })
        })
    }
  }
}
</script>

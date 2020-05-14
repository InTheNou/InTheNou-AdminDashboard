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
    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"  :onFailure="onFailure"></GoogleLogin>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
// import axios from 'axios'
import GoogleLogin from 'vue-google-login'
import { mapGetters } from 'vuex'
import Vue from 'vue'
export default {
  data: () => ({
    user: {
      access_token: null,
      id: null,
      email: '',
      display_name: ''
    },
    params: { client_id: process.env.VUE_APP_CLIENT_ID, cookie_policy: 'none', scope: 'profile email' },
    renderParams: { width: 250, height: 50, longtitle: true }
  }),
  computed: {
    ...mapGetters([
      'roleid',
      'status'
    ])
  },
  components: {
    GoogleLogin
  },
  methods: {
    async sendSessionToDB () {
      /** Body of the POST API call ***
      {"access_token":"ACCESTOKENCODE;",
      "id":"113768707919850641968",
      "email":"jonathan.santiago27@upr.edu",
      "display_name": "Jonathan X Santiago Gonzalez"
      } */
      var dbusr
      var dbstatus
      await fetch(
        process.env.VUE_APP_API_HOST + process.env.VUE_APP_LOGIN,
        {
          method: 'POST',
          mode: 'cors',
          credential: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.user)
        })
        .then(response => {
          if (response.status === 404) {
            dbstatus = response.status
            // alert('You need to be registered')
          } else if (response.status === 402) {
            dbstatus = response.status
          } else if (response.status === 401) {
            dbstatus = response.status
          }
          return response.json()
        })
        .then(data => {
          dbusr = data.uid
        })
      await this.$store.dispatch('AUTH_CLEAN')
      if (dbstatus === 404) {
        console.log('failed')
        await this.$store.dispatch('AUTH_UNREGISTERED')
        this.$router.push('/login/failed')
      } else if (dbstatus === 402) {
        console.log('failed')
        await this.$store.dispatch('AUTH_UNREGISTERED')
        this.$router.push('/login/failed')
      } else {
        await this.$store.dispatch('AUTH_REQUEST', dbusr)
        setTimeout(this.$router.push('/events/allcurrentevents'), 2000)
      }
    },
    onSuccess: async function (googleUser) {
      this.user.access_token = googleUser.tc.access_token
      await Vue.GoogleAuth.then(auth2 => {
        var profile = auth2.currentUser.get().getBasicProfile()
        // console.log(profile)
        // console.log('ID: ' + profile.getId())
        // console.log('Full Name: ' + profile.getName())
        // console.log('Given Name: ' + profile.getGivenName())
        // console.log('Family Name: ' + profile.getFamilyName())
        // console.log('Image URL: ' + profile.getImageUrl())
        // console.log('Email: ' + profile.getEmail())
        this.user.id = profile.getId()
        this.user.email = profile.getEmail()
        this.user.display_name = profile.getName()
      })
      this.sendSessionToDB(googleUser)
    }
  }
}
</script>

<template>
<v-container class="fill-height">
<nav>
  <v-app-bar text app color = "#24324f">
    <v-toolbar-title class="text-uppercase grey--text">
      <span style="color:#afbec8;"><h1>In<span style="color:#ff3e4c;">The</span>Nou</h1></span>
    </v-toolbar-title>
  </v-app-bar >
</nav>
  <v-row align="center" justify="center">
    <v-col cols="2" style="width: 200px; max-width: 100%;">
    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"  :onFailure="onFailure"></GoogleLogin>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
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
    renderParams: { width: 200, height: 50, longtitle: true }
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
      console.log('entered method session db')
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
        // console.log('failed')
        await this.$store.dispatch('AUTH_UNREGISTERED')
        this.$router.push('/login/failed')
      } else if (dbstatus === 402) {
        // console.log('failed')
        await this.$store.dispatch('AUTH_UNREGISTERED')
        this.$router.push('/login/failed')
      } else {
        await this.$store.dispatch('AUTH_REQUEST', dbusr)
        console.log('succeed')
        setTimeout(this.$router.push('/events/allcurrentevents'), 2000)
      }
    },
    onSuccess: async function (googleUser) {
      console.log('entered method onSucesss')
      await Vue.GoogleAuth.then(auth2 => {
        var profile = auth2.currentUser.get().getBasicProfile()
        this.user.access_token = auth2.currentUser.get().getAuthResponse(true).access_token
        this.user.id = profile.getId()
        this.user.email = profile.getEmail()
        this.user.display_name = profile.getName()
      })
      console.log('calling method sendSessionToDB')
      this.sendSessionToDB()
    }
  }
}
</script>

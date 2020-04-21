<template>
    <v-app>
      <v-container
        fluid
        fill-height
      >
        <v-layout>
        <router-view></router-view>
        </v-layout>
      </v-container>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
  },
  computed: mapGetters(['authStatus', 'isAuthenticated']),
  mounted () {
    // console.log('App.vue mounted:' + this.isAuthenticated)
  }
}
</script>

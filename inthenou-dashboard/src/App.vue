<template>
    <v-app>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: {

  },
  computed: mapGetters(['authStatus', 'isAuthenticated']),
  mounted () {
    console.log('App.vue mounted:' + this.isAuthenticated)
  }
}
</script>

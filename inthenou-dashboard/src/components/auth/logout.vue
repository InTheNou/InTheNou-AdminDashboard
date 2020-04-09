<template>
    <v-btn @click="logout" text color="grey">
            <span> Logout</span>
            <v-icon right></v-icon>
    </v-btn>
</template>

<script>
export default {
  methods: {
    logout: function () {
      this.$store.dispatch('AUTH_LOGOUT').then(() => { // creates promise triggers Action inside store
        this.$router.push('/') // push to the login screen
      })
    }
  }
}
</script>

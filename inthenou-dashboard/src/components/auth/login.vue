<template>
<nav>
  <v-app-bar
      text
      app
      color = "blue darken-4"
    >
        <v-toolbar-title class="text-uppercase grey--text">
            <h1>In<span style="color:red">The</span>Nou</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
    </v-app-bar >
        <v-row
          align="center"
          justify="center"
          class="grey lighten-5"
          style="height: 400px;"
        >
        <v-col cols="12">
          <v-card class="mx-auto pa-4" max-width="400">
                <v-card-title> Login:</v-card-title>
                <v-card-subtitle>Needs registration in the InTheNou app before login </v-card-subtitle>
                <div class="text-center">
                 <v-btn @click="login" rounded large color="green" elevation="10" dark>Login</v-btn>
                </div>
             </v-card>
        </v-col>
        </v-row>
</nav>
</template>
<script>
export default {
  data: () => ({
    username: 'kensy',
    password: 'password'
  }),
  methods: {
    login: function () {
      const { username, password } = this
      this.$store.dispatch('AUTH_REQUEST', { username, password }).then(() => { // creates promise triggers Action inside store
        this.$router.push('/privilegemanagement') // push to the privilegemanagement component after validation
      })
    }
  }
}
</script>

<template>
  <v-container>
  <v-col
    align="center"
    justify="center">
    <v-card class="pa-2 justify-center" outlined tile>
      <v-card v-if="noDataAvailable">
            <v-row  align="center" justify="center">
              <v-container >
                <h2 class="text-center" style="height:100%; align:center;"> USER HAS NO DELEGATES USERS AT THE MOMENT </h2>
              </v-container>
            </v-row>
      </v-card>
      <v-card v-else class="justify-center pa-0">
        <v-card-title class="headline justify-center blue darken-4 white--text">
          <v-row>
            <v-col cols="8">
              <h3>Delegated Users List</h3>
            </v-col>
          </v-row>
        </v-card-title>
        <hr />
        <v-row align="center">
          <div>
            <v-subheader></v-subheader>
          </div>
        </v-row>
        <v-container id="scroll-target" style="max-height: 400px" class="overflow-y-auto">
          <v-row  style="height: 400px"  >
            <v-col cols="12">
              <v-card >
                <v-list shaped>
                    <template v-for="(user, i) in users">
                      <v-divider v-if="!user" :key="`divider-${i}`"></v-divider>
                      <v-list-item v-else :key="`item-${i}`" :value="user" class="indigo lighten-5 mb-2" >
                          <v-col>
                            <v-list-item-content>
                              <v-list-item-title>
                                Event Creator: {{user.display_name}}
                                <v-list-item-subtitle>  Email: {{user.email}}</v-list-item-subtitle>
                                  <v-list-item-action>
                                    <router-link :to="'/userevents/'+ user.UID"> <v-btn color="primary" dark ><v-icon dark>mdi-arrow-right-bold-circle-outline</v-icon> </v-btn></router-link>
                                  </v-list-item-action>
                                </v-list-item-title>
                            </v-list-item-content>
                          </v-col>
                      </v-list-item>
                    </template>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <div></div>
      </v-card>
    </v-card>
  </v-col>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    users: [], // current users in list
    modid: '',
    noDataAvailable: false
  }),
  computed: {
    path: function () {
      return process.env.VUE_APP_API_HOST + process.env.VUE_APP_DELEGATED_USERS_1 + this.modid + process.env.VUE_APP_DELEGATED_USERS_2
    }
  },
  async mounted () {
    this.modid = this.$route.params.modid
    await this.getUsers()
  },
  methods: {
    getUsers: async function () {
      await fetch(this.path)
        .catch(error => {
          alert(error)
        })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.Users === null || data.Users === undefined) {
            this.noDataAvailable = true
          } else {
            this.noDataAvailable = false
            this.users = data.Users
          }
        })
    }
  }
}
</script>
<style scoped>
.v-col.v-text-field {
  border: 1px solid red;
  background-color: lightcoral;
}
.invalid{
    border: 1px solid red;
    background-color: lightcoral;
}
</style>

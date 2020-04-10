<template>
  <v-col cols="6">
    <v-card class="pa-2 justify-center" outlined tile>
      <v-card class="justify-center pa-0">
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
            <v-subheader>1.</v-subheader>
          </div>
        </v-row>
        <v-container id="scroll-target" style="max-height: 600px" class="overflow-y-auto">
          <v-row v-scroll:#scroll-target="onScroll" style="height: 500px"  >
            <v-col cols="12">
              <v-card >
                <v-list shaped>
                    <template v-for="(user, i) in users">
                      <v-divider v-if="!user" :key="`divider-${i}`"></v-divider>
                      <v-list-item v-else :key="`item-${i}`" :value="user" class="indigo lighten-5 mb-2" >
                          <v-col>
                            <v-list-item-content>
                              <v-list-item-title>
                                Event Creator: {{user.Email}}
                                  <v-list-item-action>
                                    <router-link :to="'/userevents/'+ user.UID"> <v-btn color="primary" dark ><v-icon dark>mdi-arrow-right-bold-circle-outline</v-icon> </v-btn></router-link>
                                  </v-list-item-action>
                                </v-list-item-title>
                              <v-list-item-subtitle>  Supervisor: {{user.SupEmail}}</v-list-item-subtitle>
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
</template>

<script>
import { userApiCall } from '../../dummyapicals/users.js'
export default {
  data: () => ({
    users: [], // current users in list
    path: '',
    modid: ''
  }),
  mounted () {
    this.modid = this.$route.params.modid
    this.path = '/supervees/' + this.modid
    // console.log(this.path)
    this.users = this.getUsers()
  },
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    getUsers: function () {
      //  this view is only for admin makes calll of the moderators in system
      return new Promise((resolve, reject) => {
        userApiCall({ url: this.path, method: 'GET' })
          .then(response => {
            resolve(this.users = response.Users)
            // console.log(response)
          })
          .catch(err => {
            reject(err)
            alert(err)
          })
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

<template>
  <v-col cols="6">
    <v-card class="pa-2 justify-center" outlined tile>
      <v-card class="justify-center pa-0">
        <v-card-title class="headline justify-center blue darken-4 white--text">
          <v-row>
            <v-col cols="8">
              <h3 v-if="viewtype=='moderator'">Moderator  List</h3>
              <h3 v-else-if="viewtype==='eventcreator'">Event Creator List</h3>
            </v-col>
            <v-spacer></v-spacer>
             <v-card-actions>
                <v-col cols="4">
                  <v-dialog v-model="adddialog" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                        <div class="text-right">
                        <v-btn color="primary mb-0 pa-0" dark v-on="on" class="mx-2" fab>
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                        </div>
                    </template>
                    <v-card>
                      <v-row justify="space-around">
                      </v-row>
                      <v-form ref="form" v-model="valid" lazy-validation >
                        <v-card-title>
                          <span v-if="viewtype==='moderator'" vclass="headline">Grant Moderator Privileges</span>
                          <span v-else-if="viewtype==='eventcreator'" vclass="headline">Grant Event Creator Privileges</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                              <v-row>
                              <v-col cols="12" >
                                <v-text-field v-model="formemail" :rules="[ v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']" label="E-mail*" filled required ></v-text-field>
                              </v-col>
                              </v-row>
                          </v-container>
                          <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="adddialog = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" :disabled="!valid" text  @click="validate" >continue</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
                </v-col>
             </v-card-actions>
          </v-row>
        </v-card-title>
        <hr />
        <v-row align="center">
          <div v-if="viewtype=='moderator'">
            <v-subheader>1.to add a new Moderator press the + sign above.</v-subheader>
            <v-subheader>2.to remove Moderators select from the list then press remove button.</v-subheader>
          </div>
          <div v-else-if="viewtype=='eventcreator'">
            <v-subheader>1.to add a new Event Creator press the + sign above.</v-subheader>
            <v-subheader>2.to remove Event creators select from the list then press remove button.</v-subheader>
          </div>
        </v-row>
        <v-container id="scroll-target" style="max-height: 600px" class="overflow-y-auto">
          <v-row v-scroll:#scroll-target="onScroll" style="height: 500px"  >
            <v-col cols="12">
              <v-card >
                <v-list shaped>
                  <v-list-item-group v-model="revokePrivList" multiple>
                    <template v-for="(user, i) in users">
                      <v-divider v-if="!user" :key="`divider-${i}`"></v-divider>
                      <v-list-item v-else :key="`item-${i}`" :value="user" active-class="blue--text text--accent-4" >
                        <template v-slot:default="{ active, toggle }">
                          <v-col v-if="viewtype==='moderator'">
                            <v-list-item-content >
                              <v-list-item-title>
                                <v-list-item-action>
                                  <v-checkbox
                                    :input-value="active"
                                    :true-value="user"
                                    color="blue accent-4"
                                    @click="toggle"
                                  ></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-action>
                                   {{user.Email}}
                                </v-list-item-action>
                                <v-list-item-action>
                                  <router-link :to="'/userevents/'+ user.UID"> <v-btn color="primary" class="ml-3" dark ><v-icon dark>mdi-arrow-right-bold-circle-outline</v-icon> </v-btn></router-link>
                                </v-list-item-action>
                                <v-list-item-action>
                                  <router-link :to="'/delegatedusers/'+ user.UID"> <v-btn color="primary" dark ><v-icon dark>mdi-account-multiple</v-icon> </v-btn></router-link>
                                </v-list-item-action>
                            </v-list-item-title>
                            </v-list-item-content>
                          </v-col>
                          <v-col v-else-if="viewtype==='eventcreator'">
                            <v-list-item-content >
                              <v-list-item-title>
                                <v-list-item-action>
                                  <v-checkbox
                                    :input-value="active"
                                    :true-value="user"
                                    color="blue accent-4"
                                    @click="toggle"
                                  ></v-checkbox>
                                </v-list-item-action>
                                Event Creator: {{user.Email}}
                                  <v-list-item-action>
                                    <router-link :to="'/userevents/'+ user.UID"> <v-btn color="primary" dark ><v-icon dark>mdi-arrow-right-bold-circle-outline</v-icon> </v-btn></router-link>
                                  </v-list-item-action>
                                </v-list-item-title>
                              <v-list-item-subtitle>  Supervisor: {{user.SupEmail}}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-col>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <div></div>
        <v-card-actions class="justify-center">
          <v-row>
            <v-col cols="12">
              <v-dialog v-model="dialog" scrollable max-width="300px">
                <template v-slot:activator="{ on }">
                  <div class="text-center">
                    <v-btn  :disabled="revokePrivList.length<=0"  large color="primary" dark v-on="on">
                      <h1>Remove</h1>
                    </v-btn>
                  </div>
                </template>
                <v-card>
                  <v-card-title>You are about to Revoke</v-card-title>
                  <v-card-title>Privileges To:</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text style="height: 300px;">
                    <ul>
                      <li v-for="mod in revokePrivList" :key="mod.email">{{ mod.Email }}</li>
                    </ul>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn color="blue darken-1"  @click="dialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1"  @click="setPrivilege(viewtype, false)">Continune</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-col>
</template>

<script>
import { userApiCall } from '../../dummyapicals/users.js'
export default {
  data: () => ({
    vieweruid: null,
    valid: true,
    adddialog: false,
    dialog: false,
    users: [], // current users in list
    revokePrivList: [], // current selected user to delete
    formemail: '', // variable that holds email input from add user form
    addinguser: false,
    path: ''
  }),
  mounted () {
    this.path = ''
    // console.log('here ' + process.env.VUE_APP_USERSLIST1)
    this.getUsers()
  },
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    setPrivilege: function (type, value) {
      // removing moderator privileges
      if ((type === 'moderator' || type === 'eventcreator') && value === true) {
        // POST method here to add moderator using email
        // needs to make the correct POST depending if is a mod or event creator
        // console.log(' POST grant privileges to' + this.formemail)
        this.users.push({ UID: 12435, Email: this.formemail, SupEmail: 'sup@gmail.com' })
        this.adddialog = false
      } else if ((type === 'moderator' || type === 'eventcreator') && value === false) {
        // no need to verify if they are moderators or event creator since user can only select from served lists
        // A user ca not remove their status as moderator or administrator
        this.dialog = false // set the dialog to false
        var list = JSON.parse(JSON.stringify(this.revokePrivList))// list of selected users to revoke moderator privileges
        for (var i = 0; i < list.length; i++) {
          // here makes POST to each user selected to remove them from list
          // console.log('POST delete:' + list[i].Email)
          // get new updated list
        }

        this.users = this.users.filter(n => !this.revokePrivList.includes(n))
        this.revokePrivList = []
      }
      this.addinguser = false
    },
    getUsers: function () {
      if (this.viewtype === 'moderator') {
        //  this view is only for admin makes calll of the moderators in system
        return new Promise((resolve, reject) => {
          userApiCall({ url: '/users/2', method: 'GET' })
            .then(response => {
              resolve(this.users = response.Users)
              // console.log(response)
            })
            .catch(err => {
              reject(err)
            })
        })
      } else if (this.viewtype === 'eventcreator') {
        return new Promise((resolve, reject) => {
          userApiCall({ url: '/users/3', method: 'GET' })
            .then(response => {
              resolve(this.users = response.Users)
            })
            .catch(err => {
              reject(err)
            })
        })
      }
    },
    getUserEvents: function () {

    },
    getUserSupervees: function (VUID, UID) {

    },
    validate: function () {
      if (this.$refs.form.validate()) {
        this.setPrivilege(this.viewtype, true)
      }
      return this.$refs.form.validate()
    }
  },
  props: {
    viewtype: String, // either moderator or eventcreator
    UID: String // Id of the user to get view
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

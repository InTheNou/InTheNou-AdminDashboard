<template>
  <v-row>
    <v-container style="max-width: 800px;" align="center">
      <v-col xsm="12" sm="6" md="12">
      <v-card class="pa-5">
        <v-card-title class="headline justify-center  white--text" style="background-color:#24324f;">
          <v-row>
            <v-col cols="8">
              <h3 v-if="viewtype=='moderator'">Moderators  List</h3>
              <h3 v-else-if="viewtype==='eventcreator'">Event Creators List</h3>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-card-title>
        <hr />
        <v-container id="scroll-target" style="max-height: 500px" class="overflow-y-auto">
              <v-card v-model="users">
                <v-list shaped>
                  <v-col v-if="users.length === 0">
                    <h2>No delegated users at the moment</h2>
                  </v-col>
                  <v-list-item-group v-model="revokePrivList" multiple>
                    <template v-for="(user, i) in users">
                      <v-divider v-if="!user" :key="`divider-${i}`"></v-divider>
                      <v-list-item v-else :key="`item-${i}`" :value="user" active-class="blue--text text--accent-4" >
                        <template v-slot:default="{ active, toggle }">
                          <v-col v-if="viewtype==='moderator'">
                            <v-list-item-content>
                                <v-row>
                                <v-col cols="8" md="7" class="pa-0">
                                <v-list-item-action class="pl-4">
                                  <v-checkbox
                                    :input-value="active"
                                    :true-value="user"
                                    color="blue accent-4"
                                    @click="toggle"
                                  ></v-checkbox>
                                </v-list-item-action>
                                   {{user.email}}
                                </v-col>
                                <v-col xsm="3" sm="3" md="5" class="pa-0">
                                <v-list-item-action>
                                  <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                      <router-link :to="'/userevents/'+ user.uid"> <v-btn v-bind="size" color="#24324f" class="ml-3" dark v-on="on"><v-icon color="#ffffff" v-bind="size" dark>mdi-calendar</v-icon> </v-btn></router-link>
                                    </template>
                                    <span>User Events</span>
                                  </v-tooltip>
                                </v-list-item-action>
                                <v-list-item-action>
                                  <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                      <router-link :to="'/delegatedusers/'+ user.uid"> <v-btn v-bind="size" color="#24324f" dark v-on="on"><v-icon v-bind="size" color="#ffffff" dark>mdi-account-multiple</v-icon> </v-btn></router-link>
                                    </template>
                                    <span>Delegated Users</span>
                                  </v-tooltip>
                                </v-list-item-action>
                                </v-col>
                                </v-row>
                            </v-list-item-content>
                          </v-col>
                          <v-col v-else-if="viewtype==='eventcreator'">
                            <v-list-item-content>
                                <v-row>
                                <v-col cols="8" md="7" class="pa-0">
                                <v-list-item-action class="pl-4">
                                  <v-checkbox
                                    :input-value="active"
                                    :true-value="user"
                                    color="blue accent-4"
                                    @click="toggle"
                                  ></v-checkbox>
                                  </v-list-item-action>
                                     {{user.email}}
                                </v-col>
                                <v-col xsm="3" sm="3" md="5" class="pa-0 pl-10">
                                  <v-list-item-action class="pl-10 ml-10">
                                    <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                      <router-link :to="'/userevents/'+ user.uid"> <v-btn v-bind="size" color="#24324f" dark v-on="on"><v-icon color="#ffffff" v-bind="size" dark>mdi-calendar</v-icon> </v-btn></router-link>
                                    </template>
                                    <span>User Events</span>
                                  </v-tooltip>
                                  </v-list-item-action>
                                </v-col>
                                </v-row>
                            </v-list-item-content>
                          </v-col>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
        </v-container>
        <v-card-actions>
        <v-row>
        <v-col cols="6">
              <v-dialog v-model="dialog" scrollable max-width="300px">
                <template v-slot:activator="{ on }">
                  <div class="text-center pa-0">
                    <v-btn v-bind="size" :disabled="revokePrivList.length<=0"  color="#ff3e4c" v-on="on">
                      <v-icon v-bind="size" color="#ffffff" dark>Remove</v-icon>
                    </v-btn>
                  </div>
                </template>
                <v-card>
                  <v-card-title>You are about to Revoke</v-card-title>
                  <v-card-title>Privileges To:</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text style="height: 300px;">
                    <ul>
                      <li v-for="user in revokePrivList" :key="user.email">{{ user.email }}</li>
                    </ul>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn v-bind="size"  color="#ff3e4c" @click="dialog = false">Cancel</v-btn>
                    <v-btn v-bind="size"  color="#24324f" @click="setPrivilege('user', false)">Continune</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
        </v-col>
        <v-spacer />
        <v-col cols="6">
                  <v-dialog v-model="adddialog" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                        <div class="text-center pa-0">
                        <v-btn v-bind="size" color="#39b54a"  v-on="on" >
                            &nbsp;<v-icon  v-bind="size" color="#ffffff" dark>  Add </v-icon>&nbsp; &nbsp;
                        </v-btn>
                        </div>
                    </template>
                    <v-card>
                      <v-row justify="space-around">
                      </v-row>
                      <v-form ref="form" v-model="valid" >
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
                              <v-col>
                                <p v-show="invalidEmail"><span style="color:red">The entered email is not a valid registered user in the system!</span></p>
                              </v-col>
                              </v-row>
                          </v-container>
                          <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#ff3e4c" text @click="adddialog = false">Cancel</v-btn>
                        <v-btn color="#24324f" :disabled="!valid" text  @click="validate" >continue</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
        </v-col>
        </v-row>
        <v-card-actions>
      </v-card>
      </v-col>
    </v-container>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    invalidEmail: false,
    // vieweruid: null,
    valid: true,
    adddialog: false,
    dialog: false,
    users: [], // current users in list
    revokePrivList: [], // current selected user to delete
    formemail: '', // variable that holds email input from add user form
    // addinguser: false,
    delegatedUserRoleID: null,
    userPrivID: '', // user to change privileges id
    userprivrole: null // user to change privilege role to give
  }),
  computed: {
    ...mapGetters([
      'uid',
      'roleid'
    ]),
    path: function () {
      return process.env.VUE_APP_API_HOST + process.env.VUE_APP_GET_USERS_BY_ROLE_1 + this.delegatedUserRoleID + process.env.VUE_APP_GET_USERS_BY_ROLE_2 + 0 + process.env.VUE_APP_GET_USERS_BY_ROLE_3 + 5000
    },
    path2: function () {
      return process.env.VUE_APP_API_HOST + process.env.VUE_APP_DELEGATED_USERS_1 + this.uid + process.env.VUE_APP_DELEGATED_USERS_2
    },
    getUserByEmailPath: function () {
      return process.env.VUE_APP_API_HOST + process.env.VUE_APP_GET_USER_BY_EMAIL + this.formemail
    },
    changeRolePath: function () {
      return process.env.VUE_APP_API_HOST + process.env.VUE_APP_CHANGE_USER_ROLE_1 + this.userPrivID + process.env.VUE_APP_CHANGE_USER_ROLE_2 + this.userprivrole
    },
    size: function () {
      const size = { xs: 'x-small', sm: 'small', lg: 'large', xl: 'large' }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    }
  },
  async mounted () {
    await this.getUsers()
  },
  methods: {
    setPrivilege: async function (type, value) {
      // controller instance to abort fetch when needed
      var controller = new AbortController()
      const { signal } = controller
      // removing moderator privileges
      if ((type === 'moderator' || type === 'eventcreator') && value === true) {
        // verifies if the user is in the system
        await fetch(
          this.getUserByEmailPath, signal,
          {
            mode: 'cors',
            credential: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            // if user emails is not in the system
            if (response.status === 404) {
              // if the entered emails is invalid set flag to true for warning message in dialog box
              this.invalidEmail = !this.invalidEmail
              // alert in browser
              alert('The entered email is not from a registered user in the system')
              // abort
              controller.abort()
              // Enters if the entered email is a valid email
            } else if (response.status === 200) {
              // Is the previous entered email was not valid hides the warning message
              if (this.invalidEmail) this.invalidEmail = !this.invalidEmail
              // returns the json response of the api call of get user by email
              return response.json()
            }
          })
          .then(data => {
            // process the json body response of the get user by email api call
            if (data.roleid === 2 && type === 'eventcreator') {
              alert('the user is already an event creator')
            } else if (data.roleid === 3 && type === 'moderator') {
              // alerts if the user is already a moderator
              alert('the user is already an moderator')
            } else if (data.roleid === 4) {
              // alets if teh user is an administrator
              alert('the user is already an administartor')
            } else {
              // set instance to the value of the user id to be given privileges
              this.userPrivID = data.uid
              // set the instance of the role to be given to 3 (moderator) or 2 (event creator)
              // based on the current type of the component that could be either 'moderator' or 'eventcreator' or 'user' when privilege is removed
              this.userprivrole = (type === 'moderator' ? 3 : 2)
              // makes api call to change the user role with the entered email
              return fetch(this.changeRolePath,
                {
                  method: 'POST',
                  mode: 'cors',
                  credential: 'include',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                .then(response => {
                  if (response.status === 200) {
                    // update sthe current url page to update user list
                    location.reload()
                  } else if (response.status === 404) {
                  }
                })
                .catch(error => {
                  alert(error)
                })
            }
          })
          .catch(error => {
            console.error(error)
          })
        // this.adddialog = false
      } else if ((type === 'user') && value === false) {
        // no need to verify if they are moderators or event creator since user can only select from view type lists to remove
        // A user ca not remove their status as moderator or administrator
        // role idto ve given 1
        this.userprivrole = 1
        for (var i = 0; i < this.revokePrivList.length; i++) {
          // here makes POST to each user selected to remove them from list
          console.log(this.revokePrivList[i].uid)
          this.userPrivID = this.revokePrivList[i].uid
          await fetch(this.changeRolePath,
            {
              method: 'POST',
              mode: 'cors',
              credential: 'include',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(response => {
              if (response.status === 200) {
                // update sthe current url page to update user list
              } else if (response.status === 404) {
              }
            })
        }
        // refres tab
        this.dialog = false // set the dialog to false
        location.reload()
      }
    },
    getUsers: async function () {
      if (this.viewtype === 'moderator' && this.roleid.toString() === '4') {
        //  this view is only for admin makes calll of the moderators in system
        this.delegatedUserRoleID = '3'
        await fetch(this.path)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            if (data.users === null) {
              this.users = []
            } else {
              this.users = data.users || []
            }
          })
      } else if (this.viewtype === 'eventcreator' && this.roleid.toString() === '4') {
        this.delegatedUserRoleID = '2'
        await fetch(this.path)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            if (data.users === null) {
              this.users = []
            } else {
              this.users = data.users || []
            }
          })
      } else if (this.viewtype === 'eventcreator' && this.roleid.toString() === '3') {
        await fetch(this.path2)
          .catch()
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            if (data.users === null) {
              this.users = []
            } else {
              this.users = data.users || []
            }
          })
      }
    },
    validate: function () {
      if (this.$refs.form.validate()) {
        this.setPrivilege(this.viewtype, true)
      }
      return this.$refs.form.validate()
    }
  },
  props: {
    viewtype: String // either moderator or eventcreator
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

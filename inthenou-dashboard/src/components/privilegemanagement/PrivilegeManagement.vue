<template>
  <v-col cols="6">
    <v-card class="pa-2 justify-center" outlined tile>
      <v-card class="justify-center pa-0">
        <v-card-title class="headline justify-center blue darken-4 white--text">
          <v-row>
            <v-col cols="8">
              <h3 v-if="viewtype=='moderator'">Moderator Users List</h3>
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
                        <v-card-title>
                          <span v-if="viewtype==='moderator'" vclass="headline">Grant Moderator Privileges</span>
                          <span v-else-if="viewtype==='eventcreator'" vclass="headline">Event Creator Privileges</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                              <v-row>
                              <v-col cols="12" >
                                <v-text-field :class="{invalid: $v.formemail.$error}" @input="$v.formemail.$touch()" v-model.lazy="formemail" label="Email*" required hint="enter the email of the user you wish to grant Moderator privileges" ></v-text-field>
                              </v-col>
                              </v-row>
                          </v-container>
                          <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="adddialog = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text :disabled="$v.$invalid" @click="setPrivilege(viewtype,true)" >continue</v-btn>
                        </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
             </v-card-actions>
          </v-row>
        </v-card-title>
        <hr />
        <v-row align="center">
          <div v-if="viewtype=='moderator'">
            <v-subheader>1.to add new Moderators press the + sign above.</v-subheader>
            <v-subheader>2.to remove Moderators select from the list then press remove button.</v-subheader>
          </div>
          <div v-else-if="viewtype=='eventcreator'">
            <v-subheader>1.to add new Event Creator press the + sign above.</v-subheader>
            <v-subheader>2.to remove Event creator select from the list then press remove button.</v-subheader>
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
                      <!-- <template v-slot:default="{ active, toggle }"> -->
                        <template >
                          <v-col v-if="viewtype==='moderator'">
                            <v-list-item-content >
                              <v-list-item-title>User: {{user.Email}}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                              <!-- <v-checkbox
                                :input-value="active"
                                :true-value="user"
                                color="blue accent-4"
                                @click="toggle"
                              ></v-checkbox> -->
                            </v-list-item-action>
                          </v-col>
                          <v-col v-else-if="viewtype==='eventcreator'">
                            <v-list-item-content >
                              <v-list-item-title>Event Creator: {{user.Email}}</v-list-item-title>
                              <v-list-item-title>user: {{user.SupEmail}}</v-list-item-title>
                            </v-list-item-content>
                            <!-- <v-list-item-action>
                              <v-checkbox
                                :input-value="active"
                                :true-value="user"
                                color="blue accent-4"
                                @click="toggle"
                              ></v-checkbox>
                            </v-list-item-action> -->
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
                    <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1"  text @click="setPrivilege(viewtype, false)">Continune</v-btn>
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
import { required, email } from "vuelidate/lib/validators";
export default {
  data: () => ({
    adddialog: false,
    dialog: false,
    users: [],         //current users in list
    revokePrivList: [], //current selected user to delete
    formemail: ""       //variable that holds email input from add user form
  }),
  validations: {
       //binded in template
      //validator for email control
    formemail: {
      required,
      email
    }
  },
  methods: {

    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
    setPrivilege: function(type, value){
     //removing moderator privileges
      if((type == 'moderator' || type =='eventcreator')&& value == true){
          //POST method here to add moderator using email
          //needs to make the correct POST depending if is a mod or event creator 
          console.log(' POST grant privileges to'+ this.formemail)
          return  this.adddialog = false;  
       }
      else if((type=='moderator' || type=='eventcreator' )&& value == false){
          //no need to verify if they are moderators or event creator since user can only select from served lists
          //A user ca not remove their status as moderator or administrator
          this.dialog = false; //set the dialog to false
          var list = JSON.parse(JSON.stringify(this.revokePrivList));//list of selected users to revoke moderator privileges
          for (var i = 0; i < list.length; i++) {
          //here makes POST to each user selected to remove them from list
          console.log('POST delete:' + list[i].Email);
          //get new updated list 
        }
         
         this.users = this.users.filter(n => !this.revokePrivList.includes(n));
         this.revokePrivList = [];
         return;
       }

    }
  },
  props: {
    viewtype: String, //either moderator or eventcreator
    userid: String
  },
  created(){
      //once is created get all users to show, this need to take in consideration the  log in user, 
      //may need to use session token or UID
 this.$http.get('https://raw.githubusercontent.com/InTheNou/InTheNou-AdminDashboard/development/'+ String(this.userid) +'users.json')
      .then(response =>{
         return response.json()
      })
      .then(data => this.users=data);
      console.log(this.users)
  }
};
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
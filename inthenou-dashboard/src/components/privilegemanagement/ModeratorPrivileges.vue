<template>

  
        <v-col cols="6" >
          <v-card class="pa-2" outlined tile >
            <v-card class="justify-center" >
                 <v-card-title class="headline justify-center blue darken-4 white--text" >Moderator Users</v-card-title>
                 <hr>
                 <v-row justify="center" align="center">
                    <v-subheader>Moderator</v-subheader> 
                 </v-row>
                <v-container id="scroll-target" style="max-height: 600px" class="overflow-y-auto">
                  <v-row v-scroll:#scroll-target="onScroll" style="height: 1000px" >
                    <v-col cols="12">
                      <v-card class="mx-auto">
                        <v-list shaped>
                          <v-list-item-group v-model="revokeModPrivList" multiple>
                            <template v-for="(moderator, i) in moderators">
                              <v-divider v-if="!moderator" :key="`divider-${i}`" ></v-divider>
                              <v-list-item v-else :key="`item-${i}`" :value="moderator" active-class="blue--text text--accent-4" >
                                <template v-slot:default="{ active, toggle }">
                                  <v-list-item-content>
                                    <v-list-item-title >User: {{moderator.Email}}</v-list-item-title>
                                  </v-list-item-content>
                                  <v-list-item-action>
                                      <v-checkbox :input-value="active" :true-value="moderator" color="blue accent-4" @click="toggle" >
                                      </v-checkbox>
                                  </v-list-item-action>
                                </template>
                              </v-list-item>
                            </template>
                          </v-list-item-group>
                        </v-list>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
                    <div>   
                    </div>
                <v-card-actions class="justify-center" >
                  <v-spacer></v-spacer>
                  <v-row justify="center">
                     <v-col cols="12">
                        <v-dialog v-model="adddialog" persistent max-width="600px">
                            <template v-slot:activator="{ on }">
                                <v-btn large color="primary" dark v-on="on"><h1>ADD</h1></v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                <span class="headline">Grant Moderator Privileges</span>
                                </v-card-title>
                                <v-card-text>
                                <v-container>
                                    <v-row>                             
                                    <v-col cols="12" :class="{invalid: $v.formemail.$error}">
                                        <v-text-field @input="$v.formemail.$touch()" v-model.lazy="formemail" label="Email*" required hint="enter the email of the user you wish to grant Moderator privileges"></v-text-field>
                                        <div>{{$v}}</div>
                                    </v-col>
                                    </v-row>
                                </v-container>
                                <small>*indicates required field</small>
                                </v-card-text>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="adddialog = false">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="grantPrivileges">continue</v-btn>
                                </v-card-actions>
                            </v-card>
                         </v-dialog>
                     </v-col>
                   </v-row>
                  <v-spacer></v-spacer>
                   <v-row justify="center">
                     <v-col cols="12">
                        <v-dialog v-model="dialog" scrollable max-width="300px">
                            <template v-slot:activator="{ on }">
                            <v-btn large color="primary" dark v-on="on"><h1>Remove</h1></v-btn>
                            </template>
                            <v-card >
                            <v-card-title>You are about to Revoke</v-card-title>
                            <v-card-title> Privileges To:</v-card-title>
                            <v-divider></v-divider>
                            <v-card-text style="height: 300px;">
                                <ul>
                                <li v-for="mod in revokeModPrivList" :key="mod.email">
                                    {{ mod.Email }} 
                                </li>
                                </ul>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                <v-btn color="blue darken-1" text @click="revokePrivileges"  >Continune</v-btn>
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
import{required, email} from 'vuelidate/lib/validators'
  export default {
    data: () => ({
      remove:false,
      adddialog:false,
        dialog: false,
          moderators: [
        { UID: 541,Email: "user.email1@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 542,Email: "user.email2@gmail.com",SupEmail: "user2.email@gmail.com"},      
        { UID: 543,Email: "user.email3@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 544,Email: "user.email4@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 545,Email: "user.email5@gmail.com",SupEmail:  "user2.email@gmail.com"},
        { UID: 1541,Email: "user.emai6l@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 5142,Email: "user.email7@gmail.com",SupEmail: "user2.email@gmail.com"},      
        { UID: 5413,Email: "user.email8@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 5414,Email: "user.email9@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 5415,Email: "user.email10@gmail.com",SupEmail:"user2.email@gmail.com"},
        { UID: 5411,Email: "user.email11@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 5412,Email: "user.email12@gmail.com",SupEmail: "user2.email@gmail.com"},      
        { UID: 54113,Email: "user.email13@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 54314,Email: "user.email14@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 54415,Email: "user.email15@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 54311,Email: "user.email16@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 542812,Email: "user.email17@gmail.com",SupEmail: "user2.email@gmail.com"},      
        { UID: 54813,Email: "user.email18@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 54014,Email: "user.email19@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 54915,Email: "user.email20@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 54711,Email: "user.email21@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 54142,Email: "user.email22@gmail.com",SupEmail: "user2.email@gmail.com"},      
        { UID: 54313,Email: "user.email23@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 54124,Email: "user.email24@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 54715,Email: "user.email25@gmail.com",SupEmail: "user2.email@gmail.com"},
        
      ],
      revokeModPrivList: [],
      formemail:''
  }),
  validations: {
      //binded in template 
      formemail: {
          //validators for this controll
         required,
         email
      }
  },
  methods: {
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
      },
      revokePrivileges(){
        //simulates the post method on selected users from list  
          this.dialog=false
        var  list= JSON.parse(JSON.stringify(this.revokeModPrivList))
          for(var i=0;i<list.length;i++){
            console.log("POST delete:" + list[i].Email )
          }
         return 
      },
      grantPrivileges(){
          //needs to see if already in moderators/ or event creators
          //need  to 
          
          return 
      },
    

    }
  }
</script>
<style scoped>
.v-col.v-text-field {
    border: 1px solid red;
    background-color: lightcoral;

}
</style>
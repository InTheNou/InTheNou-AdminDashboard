<template>
  
        <!-- Template for Event Creators Users Privilege Management -->
        <v-col cols="6" >
          <v-card class="pa-2" outlined tile >
            <v-card class="justify-center" >
                 <v-card-title class="headline justify-center blue darken-4 white--text" >Event Creator Users</v-card-title>
                 <hr>
                 <v-row justify="center" align="center">
                    <v-subheader>Event Creator / Moderator</v-subheader> 
                 </v-row>
                <v-container id="scroll-target" style="max-height: 600px" class="overflow-y-auto">
                  <v-row v-scroll:#scroll-target="onScroll" style="height: 1000px" >
                    <v-col cols="12">
                      <v-card class="mx-auto">
                        <v-list shaped>
                          <v-list-item-group v-model="revokeEvenCrePrivList" multiple>
                            <template v-for="(eventcreator, i) in eventcreators">
                              <v-divider v-if="!eventcreators" :key="`divider-${i}`" ></v-divider>
                              <v-list-item v-else :key="`item-${i}`" :value="eventcreator" active-class="blue--text text--accent-4" >
                                <template v-slot:default="{ active, toggle }">
                                  <v-list-item-content>
                                    <v-list-item-title >Event Creator: {{eventcreator.Email}}</v-list-item-title>
                                    <v-list-item-title >Moderator: {{eventcreator.SupEmail}}</v-list-item-title>
                                  </v-list-item-content>
                                  <v-list-item-action>
                                      <v-checkbox :input-value="active" :true-value="eventcreator" color="blue accent-4" @click="toggle" >
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
                  <v-btn large color="primary" route: to="/" ><h1>Add</h1></v-btn>
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
                            <li v-for="item in revokeEvenCrePrivList" :key="item">
                              {{ item.Email }} 
                            </li>
                          </ul>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                          <v-btn color="blue darken-1" text @click="dialog = false">Continune</v-btn>
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
  export default {
    data: () => ({
      remove:false,    
        dialogm1: '',
        dialog: false,
        userlist:[]
      ,
      eventcreators: [
        { UID: 41,Email: "user.email@gmail.com",SupEmail:"user2.email@gmail.com"},
        { UID: 42,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},      
        { UID: 43,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 44,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 45,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 411,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 412,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},      
        { UID: 413,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 414,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 415,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 411,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 412,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},      
        { UID: 433,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 434,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 445,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 541,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 642,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},      
        { UID: 473,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 944,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 4075,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 401,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 402,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},      
        { UID: 403,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 4974,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        { UID: 405,Email: "user.email@gmail.com",SupEmail: "user2.email@gmail.com"},
        
      ],
      revokeModPrivList: [],
      revokeEvenCrePrivList: []
  }),
  methods: {
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
      },
      printModel(){
        return console.log(this.model);
      }
    }
  }
</script>
Discover
---
title: login.vue
lang: en-US
---

# login.vue Component
### Component view
![Login component view](/docs/dashboard/Login.PNG)
### Expected Behaviour
The login component is used to authenticate registered users of the InTheNou system.
Once the user logins using their Google Gmail account the component sends a POST API call to the backend with the OAuth credentials.
Finally a the component dispatch an authentication request to the centralized store after authentication the user is redirected to the current events view. 


## Vue Instance


#### Imports
``` js
/** plugin used for google login and logout buttons can be accessed globally **/ 
import GoogleLogin from 'vue-google-login'
/**  pluging for a centrlized state management for vue can be used accessed globally  **/
import { mapGetters } from 'vuex'
/** Import of global vue instance to access installed dependencies such as vue-google-login **/
import Vue from 'vue'
```

#### Data Properties
``` js
    /**
     * When a Vue instance is created, it adds all the properties  
     * found in its data object to Vue’s reactivity system
     */
    data: () => ({
    /** user data object holds the values needed to send through the Login API call **/
    user: {
      access_token: null,
      id: null,
      email: '',
      display_name: ''
    },
    // Parameters used in gooogle oAuth
    // client_id for the login found in google devs console
    // cookie policy
    // scope
    //for more details visit the vue-google-login npm link in dependencies section
    params: { client_id: process.env.VUE_APP_CLIENT_ID, cookie_policy: 'none', scope: 'profile email' },
    // rendering parameters of the login button
    renderParams: { width: 250, height: 50, longtitle: true }
  })
```
#### Computed properties 
``` js
    // computed properties are used when complex logic is needed
    computed: {
     // import of getters from store.js the central state management of the application
     // roleid and status can be call similar to the data properties with the this prefix
    ...mapGetters([
      'roleid',
      'status'
    ])
   }
```

#### Methods
``` js
methods: {
    /**
     * This method is call after a user sucessfully login into its gmail account
     * googleUser: When the user successfully signs in, the callback will 
     * return an object that contains information about the user and the access 
     * token granted
     */
    onSuccess: async function (googleUser){}
    /**
     * Send user object information to the backend
     * used API calls:
     * - /API/Dashboard/login 
     */
     sendSessionToDB: async function () {}
}
```
#### Components
``` js
components: {
  // component from npm vue-google-login package
    GoogleLogin
  }
```

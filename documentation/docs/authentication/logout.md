---
title: logout.vue
lang: en-US
---

# logout.vue
### Component view
![Login component view](/docs/dashboard/Logout.PNG)
### Expected Behaviour
The logout component is used to end the user session. Once the logout button is pressed a call to the google API is made on success a POST API call is made to logout the user form the InTheNou system. 


## Vue Instance

#### Imports
``` js
// plugin used for google login and logout buttons can be accessed globally 
import GoogleLogin from 'vue-google-login'
// Import of global vue instance to access installed dependencies such as vue-google-login
import Vue from 'vue'
```
#### Data Properties
``` js
    // When a Vue instance is created, it adds all the properties  
    // found in its data object to Vue’s reactivity system
    data: () => ({
    // Parameters used in gooogle oAuth
    //for more details visit the vue-google-login npm link in dependencies section
    params: { client_id: process.env.VUE_APP_CLIENT_ID }
  })
```
#### Computed properties 
``` js
    // computed properties are used when complex logic is needed in property values
    computed: {
    // propery bind to the logout button in template,
    // resizes button base on breakpoint size
    size: function () {
      const size = { xs: 'x-small', sm: 'small', lg: 'large', xl: 'x-large' }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    }
  }
```

#### Methods
``` js
methods: {
    /**
     * This method is call after a user sucessfully logouts of its gmail account
     * used API calls:
     *  - /API/Dashboard/logout
     */
    onSuccess: async function (){}
}
```
#### Components
``` js
components: {
  // component from npm vue-google-login package
    GoogleLogin
  }
```
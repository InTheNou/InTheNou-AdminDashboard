---
title: Navbar.vue
lang: en-US
---
# Navbar.vue
## Component Information
### Component view
![Navbar component view](/docs/dashboard/Navbar.PNG)
### Expected Behaviour
The navigation bar is used to navigate to the different views of the system. The administrator bar differs from a moderator bar in that the moderator can not access the moderator list and the tags management components. It also contains the search component and the logout components.

## Vue Instance
#### Imports
``` js
import Logout from '../auth/logout.vue'
import { mapGetters } from 'vuex'
```
#### Data Properties
``` js
    // When a Vue instance is created, it adds all the properties  
    // found in its data object to Vue’s reactivity system
    data: () => ({
    drawer: null,
    selectedSearch: 'buildings',
    search: '',
    validSearch: true
  })
```
#### Computed properties 
``` js
computed: {
    /**
     * return role id of the current user
     */
    ...mapGetters([
      'roleid'
    ])
    /**
     * return the items(views) to be shown in the navigation drawer, depending on the role id of the user
     */
    items: function () {}
}
```

#### Methods
``` js
methods: {
   /**
    * follow route to the searched term in the search bar after the method is called 
    */
    followRoute: function () {}
    /**
     * clears search bar validation 
     */
    clearValdation: function () {}
  }
```
#### Watchers
``` js
watch: {
    /**
     * watch for changes in the search bar and routes to the search ocmponent 
     */
    search: function () {}
    /**
     * watch for changes in the select list of search type
     */
    selectedSearch: function () {}
    /**
     * watch for changes in route, which is where the search term is reflecte 
     */
    $route: function ()
  }
```
#### Components
``` js
  components: {
    /**
     *  log out component used in navigation bar 
     */
    'log-out': Logout
  }
```
#### Lifecycle hooks
``` js
/**
 * Called after the instance has been mounted, 
 * where el is replaced by the newly created vm.$el
 */
mounted () {}
```
#### directives
``` js 
directives: {
    /**
     *  activates when a user clicks outsite of the template element binded to th edirective
     * clears the validation of the template element
     */
    'click-outside': {}
}
```
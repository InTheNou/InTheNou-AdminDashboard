---
title: DelegatedUsers.vue
lang: en-US
---
# DelegatedUsers.vue
## Component Information
### Component view
![Button to access delegated users view](/docs/dashboard/DelegatedUsers.PNG)
Button to access a moderator delegated users

![Button to access delegated users view](/docs/dashboard/DelegatedUserslist.PNG)
Delegated users list of a moderator 

![Button to access delegated users view](/docs/dashboard/EmptyDelegatedUsers.PNG)
Empty delegated users list

### Expected Behaviour
This component shows a list of delegated user of a selected moderator.

## Vue Instance
#### Imports
``` js
/** NONE USED **/
```
#### Data Properties
``` js
    // When a Vue instance is created, it adds all the properties  
    // found in its data object to Vue’s reactivity system
    data: () => ({
    users: [], // current users in list
    modid: '',
    noDataAvailable: false
  })
```
#### Computed properties 
``` js
computed: {
    /**
     * path for get delegater user API call
     */
    path: function () {}
}
```

#### Methods
``` js
methods: {
    /**
     * fetch delegated users of logged user
     */
    fetchUsers: async function () {}
  }
```
#### Watchers
``` js
/** NONE USED **/
```
#### Components
``` js

/** NONE USED **/
```
#### Lifecycle hooks
``` js
/**
 * Called after the instance has been mounted, 
 * where el is replaced by the newly created vm.$el
 * call method fetUsers()
 */
async mounted () {}
```



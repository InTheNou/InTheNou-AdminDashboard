---
title: PrivilegeManagement.vue
lang: en-US
---
# PrivilegeManagement.vue
## Component Information
### Component view
![Empty Event creator List view](/EmptyEventCreatorList.PNG)
Event Creator list view

![Empty Event creator List view](/Moderators.PNG)
Moderators list

### Expected Behaviour
The privilege management component is used  in the moderators and event creators component, to create the view of each component passing as progs the string of the view type, 'eventcreators' or 'moderators'. In the moderator view, a user, in this case an administrator, is able to see their delegated users events' and delegated users' and also the events of their delegated users. In the event creator view a moderator or administrator user is seeing their delegated event creator users and their created events if the even button is pressed.


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
    invalidEmail: false,
    valid: true,
    adddialog: false,
    dialog: false,
    users: [], // current users in list
    revokePrivList: [], // current selected user to delete
    formemail: '', // variable that holds email input from add user form
    delegatedUserRoleID: null,
    userPrivID: '', // user to change privileges id
    userprivrole: null // user to change privilege role to give
  })
```
#### Computed properties 
``` js
 computed: {
     /**
      * 
      */
    ...mapGetters([
      'uid',
      'roleid'
    ])
    /**
     *  return API path for getting user by role
     */
    path: function () {}
    /**
     * return API path to get delegate users
     */
    path2: function () {}
    /**
     * fetch user in the system using an email
     * if the user is not in the system set invalid email variable to true
     */
    getUserByEmailPath: function () {}
    /**
     * return API path for changing role 
     */
    changeRolePath: function () {}
    /**
     * // propery bind to a button in template, resizes button base on breakpoint size
     */
    size: function () {}
 }
```

#### Methods
``` js
methods: {
    /**
     * change provilege of the user
     * type: current user type view  'eventcreators' or 'moderators'
     * value of role (1-general user, 2- event creator, 3- moderator)
     */
    setPrivilege: async function (type, value) {}
    /**
     * fetch users depending on the type of view 'eventcreators' or 'moderators'
     */
    getUsers: async function () {}
    /**
     * validate form inputs fields
     */
    validate: function () {}
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
 */
async mounted () {}
```
#### props
``` js
/** NONE USED **/
```
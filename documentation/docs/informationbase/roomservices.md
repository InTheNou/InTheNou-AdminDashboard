---
title: RoomServices.vue
lang: en-US
---
# RoomServices.vue
## Component Information
### Component view
![Room Services component view](/docs/dashboard/InformationBaseRoomServices.PNG)
### Expected Behaviour
The component shows a list of services of a selected room, the user can search any service in the search bar. When a user clicks over a service the component routes the user to the service services view.


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
    noDataAvailable: false,
    roomID: null, // room ID
    servicesList: [],
    filteredServicesList: [],
    path: '',
    search: ''
  })
```
#### Computed properties 
``` js
/** NONE USED **/ 
```

#### Methods
``` js
methods: {
    /**
     * void : fetch all services of a room using the roomID variable instance of the Vue instance then assign the response value to servicesList instance
     * error: generates a Dialog in case of error notifying the user
     */
    fetchServices: async function () {}
    /**
     *  route selected service to the service details view
     */
    followRoute: function (sid) {}
  }
```
#### Watchers
``` js
watch: {
    /**
     * watch when the search term changes
     * and push any match to filteredServicesList array
     */
    search: function () {}
    /**
     * assigns to the filteredServicesList array to the servicesList array value 
     */
    servicesList: function () {}
  }
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
 * assing to roomID the value of the current room
 * call method fetchServices()
 */
async mounted () {}
```

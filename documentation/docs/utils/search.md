---
title: Search.vue
lang: en-US
---
# Search.vue
## Component Information
### Component view
![building search view](/docs/dashboard/buildingSearch.PNG)
building search by keyword

![service search view](/docs/dashboard/serviceSearch.PNG)
service search by keyword


![room search view](/docs/dashboard/roomSearch.PNG)
service search by description keyword

### Expected Behaviour
The search component lets you search buildings, services, and rooms using title keyword, title keyword, and description keyword respectively. 


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
    buildingsList: [],
    roomsList: [],
    servicesList: [],
    noDataAvailable: false
  })
```
#### Computed properties 
``` js
 computed: {
    searchType: function () {}
  }
```

#### Methods
``` js
methods: {
    /**
     *  routes a selected room to room details
     */
    followRoomRoute: function (buildingid, floor, roomid) {}
    /**
     * routes to a selected building to building details
     */
    followBuildingRoute: function (bid) {}
    /**
     *  routes a selected service to services details
     */
    followServiceRoute: function (sid) {}
    /**
     *  fetch buildings of the search term used
     */
    buildingSearch: async function () {}
    /**
     * fetch rooms of the search term used
     */
    roomSearch: async function () {}
    /**
     * fetch services of the search term used
     */
    serviceSearch: async function () {}
  }
```
#### Watchers
``` js
watch: {
    /**
     * watch if the url route changes
     * and call the pertinent search method
     */
    $route: async function {}
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
 */
mounted () {}
```

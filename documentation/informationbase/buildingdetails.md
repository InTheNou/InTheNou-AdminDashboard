---
title: BuildingDetails.vue
lang: en-US
---
# BuildingDetails.vue
## Component Information
### Component view
![Building Detail component view](/IformationBaseBuildingDetails.PNG)
### Expected Behaviour
The component shows the building details and floors, when a user clicks a floor it routes the user to the rooms of that floor. 


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
    bid: null, // id of the building
    building: [] // holds the object of the building
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
     * fetch building object
     */
    fetchBuilding: async function () {}
    /**
     * route user to the floor rooms componet
     */
    followRoute: function (bid, floor) {}
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
 * assing the value of the building id to the variable bid
 * call method fetchBuilding()
 */
async mounted () {}
```

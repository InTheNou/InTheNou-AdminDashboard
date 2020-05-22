---
title: FloorRooms.vue
lang: en-US
---
# FloorRooms.vue 
## Component Information
### Component view
![Floor Rooms component view](/docs/dashboard/InformationBaseRooms.PNG)
### Expected Behaviour
The component shows a list of rooms of a selected floor, the user can search any room in the search bar. When a user clicks over a room the component routes the user to the room services view.


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
    noDataAvailable: false, // bolean variable to control the template to be rendered
    buildingID: null, //  variable to building id of a selected room
    floorID: null, // variable to hold floor number of a selected room
    roomsList: [], // object array holding room objects
    filteredRoomsList: [], // object array holding room objects
    search: '', // string variable holds the search term
    building: [] // object variable holds a building object
  })
```
#### Computed properties 
``` js
 /** NONE USED **/
```

#### Methods
``` js
/**
 * fetch rooms of a building floor
 */
fetchRooms: async function () {}
/**
 * route selected path to the room service component
 */
followRoute: fucntion (buildingid, floor, roomid) {}
```
#### Watchers
``` js
watch: {
    /**
     * watch when the search term changes
     * and push any match to filteredRoomsList array
     */
    search: function () {}
    /**
     * assigns to the filteredRoomsList array to the rooms array value 
     */
    roomsList: function () {}
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
 * calls method fetchRooms()
 */
async mounted () {}
```

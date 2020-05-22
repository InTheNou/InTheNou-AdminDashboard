---
title: RoomsCoordinatesManagement.vue
lang: en-US
---
# RoomsCoordinatesManagement.vue

## Component Information
### Component view
![Coordinates component view](/docs/dashboard/CoordinatesManagement.PNG)
Coordinates Management View 

![Coordinates component view](/docs/dashboard/EditCoordinatesform.PNG)
Coordinates Edit Form  View 
### Expected Behaviour
The component allows the user to edit the room's coordinates latitude, longitude, and altitude of any given room of a selected building and floor.


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
    search: '',
    valid: false,
    dialog: false,
    buildingsSelectList: [], // List of buildings names in the system
    selectedBuilding: '', // building selected from buildingsSelectList
    floorsSelectList: [], // List of floors for a selected building
    selectedFloor: '', // floor selected from floorsSelectList
    selectedBuildingID: null, // ID of selected building
    selectedFloorID: null, // number of selected floor
    buildingObjectsList: [], // List holding building JSON objects of the system
    headers: // Table headers
    [
      { text: 'Room', align: 'start', value: 'rcode', sortable: true },
      { text: 'Latitude', value: 'rlatitude', sortable: false },
      { text: 'Longitude', value: 'rlongitude', sortable: false },
      { text: 'Altitude', value: 'raltitude', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    roomsObjectsList: [], // List holding room JSON objects of a selected floor
    editedRoomObjectIndex: -1, // Index of the room object being edit
    roomObject: // structure of the JSON room objects fo makin edits
    {
      photourl: '', // url of the room
      raltitude: 0, // room altitude coordinate
      rcode: '', // room code without building prefix
      rcustodian: '', // custodian of the room
      rdept: '', // department in charge of the room
      rdescription: '', // room description
      rfloor: 0, // floor where the room is located
      rid: 0, // room id in the backend
      rlatitude: 0, // room latitude coordinate
      rlongitude: 0, // room longitude coordinate
      roccupancy: 0 // room capacity
    },
    defalutRoomObject: // temporary structure of the JSON room objects holds original values before editing roomObject
    {
      photourl: '', // url of the room
      raltitude: 0, // room altitude coordinate
      rcode: '', // room code without building prefix
      rcustodian: '', // custodian of the room
      rdept: '', // department in charge of the room
      rdescription: '', // room description
      rfloor: 0, // floor where the room is located
      rid: 0, // room id in the backend
      rlatitude: 0, // room latitude coordinate
      rlongitude: 0, // room longitude coordinate
      roccupancy: 0 // room capacity
    },
    rLatitudeRules:
    [
      v => !!v || 'Latitude is required',
      v => /^((18)([.]?[0-9]{0,6}))$/.test(v) || 'latitude must be valid 18.######'
    ],
    rLongitudeRules:
    [
      v => !!v || 'Longitude is required',
      v => /^([-](67)([.]?[0-9]{0,6}))$/.test(v) || 'longitude must be valid -67.######'
    ],
    rAltitudeRules:
    [
      v => !!v || 'Altitude is required',
      v => /^([01]?[0-9]?[0-9]|200)(((\.)(\d+){1,3}))?$/.test(v) || 'Altitudee must be valid 0 - 200.######'
    ]
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
     * validates the edit coordinates form using
     * the rules property in the v-text-field tags
     * if inputs are valid calls save method
     */
    validate: function () {}
    /**
     * opens the editc coordinates form when called
     * room : the room object being edited
     */
    editRoomObject (room) {}
    /**
     * close the edit coordinates dialog
     * restore any chnages to the roomObject
     * by interchanging it with the defaultRoomObject
     */
    close () {}
    /**
     * commit changes to the backend once the function is called
     * uses POST method
     */
    save: async function () {}
    /**
     * fetch List of buildings in the system
     *
     */
    fetchBuildings: async function () {}
    /**
     * fetch list of rooms once a building and floor is selected
     */
    fetchRooms: async function () {}
  }
```
#### Watchers
``` js
watch: {
    /**
     * watch for chanes in the selectedBuilding variable
     * if any changes occurs updates empty the room list
     */
    selectedBuilding: function () {}
    /**
     * watch for changes in the selectedFloor variable
     * if any changes occurs calls the method fetchRooms() which updates the selectRoomsList
     */
    selectedFloor: async function {}
    /**
     * watches for changes in dialog variable
     * if dialog is false calls method close()
     */
    dialog (val) {}
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
 * call method fetchBuildings()
 */
async created () {}
```

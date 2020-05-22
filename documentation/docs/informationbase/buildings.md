---
title: Buildings.vue
lang: en-US
---
# Buildings.vue
## Component Information
### Component view
![Buildings component view](/docs/dashboard/InformationBaseBuildings.PNG)
### Expected Behaviour
The logged user can see a list of all the university buildings, also search for any particular building in the search bar.


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
    buildings: [], // object array holds buildings objects
    filteredBuildingsList: [], // object array holds building objects of the searched term
    buildingOffset: 0, // offset of the buildings to fetch
    builingLimit: 1000, // limit of the buildings to fetch
    search: '' // string variable holds the search term
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
     * fetch buildings of the system
     */
    fetchBuildings: async function () {}
    /**
     * route view to building details component
     */
    followRoute: async function () {}
}

```
#### Watchers
``` js
watch: {
    /**
     * watch when the search term changes
     * and push any match to filteredBuildingsList array
     */
    search: function () {}
    /**
     *  assigns to the filteredBuildingsList array to the buildings array value 
     */
    buildings: function () {}
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
 * calls method fetchBuildings()
 */
async mounted () {}
```

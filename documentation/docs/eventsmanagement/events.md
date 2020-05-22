---
title: Events.vue
lang: en-US
---

# Events.vue
## Component information
### Component view
![Login component view](/docs/dashboard/Events.PNG)
Events view of Event Archive view

![Login component view](/docs/dashboard/EventsEmpty.PNG)
Events view of Current Views empty
### Expected Behaviour
The Events component returns a list of events depending on the view type of the event list, which are 'allcurrentevents', 'alleventsarchive', 'alldeletedevents', 'myevents', and 'userevents'. The vents limit can be modified by selecting an option from the quantity dropdown between the previous and next buttons. 

## Vue Instance

#### Imports
``` js
// shared methods of events management
import { getEvents, previous, next, formatDate } from './events.js'
// pluging for a centrlized state management for vue can be used accessed globally 
import { mapGetters } from 'vuex'
```
#### Data Properties
``` js
    // When a Vue instance is created, it adds all the properties  
    // found in its data object to Vue’s reactivity system
    data: () => ({
    offset: 0, // offset value of for the API fetch events call 
    limit: 6, // limit value of for the API fetch events call
    listofevents: [], // array variable holds the events of the API response
    disablenext: false, // bolean value to diable/enable next button
    disableprev: true // bolean value to diable/enable prev button
  })
```
#### Computed properties 
``` js
    // computed properties are used when complex logic is needed
    computed: {
    ...mapGetters([
      'uid'
    ]),
    /**
     * returns API path for calling the respective event list
     * depends on the url :viewtype variable
     * options: allcurrentevents, alleventsarchive, alldeletedevents
     * myevents, userevents
     */
    eventsApiPath: function () {},
    /**
     * return a size to the binded template element
     * depending on the breakpoint size of the current screen
     */
    size: function () {}
  }
```

#### Methods
``` js
methods: {
    /**
     * fetch events depending on the computed property eventsApiPath
     * return a list of events
     */
    fetchEvents: async function () {}
    /**
     * fetch the next events based on the offset and limit values
     */
    previous: async function () {}
    /**
     * fetch the previous events based on the offset and limit values
     */
    next: async function () {}
    /**
     * date: string UTC date
     * return string value of the current local date
     */
    formatDate: function (date) {}
    /**
     * route to event details component view
     * eid: int value of the event to route
     */
    followRoute: function (eid) {}
}
```
#### Watchers
``` js
watch: {
    /**
     * watch the selected value of the limit of events
     */
    limit: async function () {}
    /**
     * watch if the route value changes to compute new eventsApipath
     * and fetch new events
     */
    $route: async function () {}
  }
```
#### Components
``` js
components: {
    /**
     * component from npm vue-google-login package
     */
    GoogleLogin
  }
```
#### Lifecycle hooks
``` js
/**
 * Called after the instance has been mounted, 
 * where el is replaced by the newly created vm.$el
 * calls method fetch events and assing the return values
 * to listofevents
 */
async mounted () {}
```

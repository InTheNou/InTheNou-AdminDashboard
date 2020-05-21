---
title: UserEvents.vue
lang: en-US
---
# Events.vue
## Component information
### Component view
![User Events' component view](/UserEvents.PNG)
 Delegated User Events'
 ![User Events' component view](/UserEventsEmpty.PNG)
 Delegated User with no events
 
### Expected Behaviour
The logged user can navigate through it delegated event creators user's events seen their, deleted, archived, and upcoming events. Also the logged user can delete upcoming events of their delegated users. 

## Vue Instance

#### Imports
``` js
// shared methods of events management
import { getEvents, previous, next, deleteEvent, formatDate, isPastDate } from './events.js'
```
#### Data Properties
``` js
    // When a Vue instance is created, it adds all the properties  
    // found in its data object to Vue’s reactivity system
    data: () => ({ 
    eidtoremove: null, // id of the event to delete
    etitletoremove: null, // string variable holds the title of the event to delete
    offset: 0, // offset value of for the API fetch events call 
    limit: 6, // limit value of for the API fetch events call
    dialog: false, // boolean variable to control dialog when delete button is pressed
    listofevents: [], // array variable holds the events of the API response
    })
```
#### Computed properties 
``` js
    // computed properties are used when complex logic is needed
    computed: {
    /**
     * returns API path for calling the delegate user events
     */
    eventsApiPath: function () {}
    /**
     * returns the API call for
     * delete event by id
     */
    deleteEventApiPath: function () {}
  }
```

#### Methods
``` js
methods: {
    /**
     *  fetch events of delegated user
     */
    fetchEvents: async function () {}
    /**
     * fetch the previous events based on the offset and limit values
     */
    previous: async function () {}
    /**
     * fetch the next events based on the offset and limit values
     */
    next: async function () {}
    /**
     *  makes API call to delete selected event
     */
    deleteEvent: async function () {}
    /**
     * format the utc date to current local time
     * date: string UTC format
     */
    formatDate: function () {}
    /**
     * compares the date passed as an argument with current date returns a boolean value 
     * true for past dates
     * false for future date
     * date: string UTC format 
     */
    isPastDate: function () {}
}
```
#### Watchers
``` js
watch: {
  /**
    * watch the selected value of the limit of events
   */
  limit: async function () {}
}
```
#### Lifecycle hooks
``` js
/**
 * Called after the instance has been mounted, 
 * where el is replaced by the newly created vm.$el
 */
async mounted () {}
```

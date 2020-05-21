---
title: EventDetails.vue
lang: en-US
---

# EventDetails.vue
## Component information
### Component view
![Event Details component view](/EventDetails.PNG)

          Event Details View

![Event Details component view](/EventDetails1.PNG)

           Event Details with Image Opened View

![Event Details component view](/EventDetailsDelete.PNG)

          Event Details with enable delete button

![Event Details component view](/EventDetailsDeletepressed.PNG)

           Event Details dialog when delete button is pressed
### Expected Behaviour
The event details component shows in more detail a clicked event from Current Events, Events Archive, Deleted Events, and My Events lists. If a current event is selected and the user has the authorization to delete it, the user is the creator or a delegated of the user is the creator, a delete button would appear at the bottom right corner of the card. If the user deletes and event the screen go back to the Current Events.

## Vue Instance
#### Imports
``` js
// shared methods of events management
import { previous, next, deleteEvent, formatDate, isPastDate } from './events.js'
//  pluging for a centrlized state management for vue can be used accessed globally 
import { mapGetters } from 'vuex'
```
#### Data Properties
``` js
    // When a Vue instance is created, it adds all the properties  
    // found in its data object to Vue’s reactivity system
    data: () => ({
    isAuthorized: false, // boolean variable used to diable delete button of event
    eventTitleToRemove: null, // variable that holds the name of the evet to be deleted
    dialog: false, // bolean variable used for the warning dialog when deleting an event
    //default event object
    event: { 
      ecreation: '', 
      ecreator: { 
        display_name: '', 
        email: '', 
        roleid: 0,
         type: '', 
         uid: 1 
      }, 
      edescription: '', 
      eend: '2020-05-14 12:30:00', 
      eid: 0, 
      estart: '2020-05-14 12:30:00', 
      estatus: '', 
      estatusdate: '', 
      etitle: '', 
      photourl: '', 
      room: { 
        building: { 
          babbrev: '', 
          bcommonname: '', 
          bid: 0, 
          bname: '', 
          btype: '', 
          distinctfloors: [], 
          numfloors: 0, 
          photourl: '' 
        }, 
        photourl: '', 
        raltitude: 50.04, 
        rcode: '', 
        rcustodian: '', 
        rdept: '', 
        rdescription: '', 
        rfloor: 0, 
        rid: 0, 
        rlatitude: 18.209641, 
        rlongitude: -67.139923, 
        roccupancy: 0 }, 
        tags: [], 
        websites: '' 
      }
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
     * returns the API call for
     * get event by id of the selected event
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
     * delete the event
     */
    deleteEvent: async function () {}
    /**
     * format the utc date to current local time
     * date: string UTC format
     */
    formatDate: function (date) {}
    /**
     * compares the date passed as an argument with current date returns a boolean value 
     * true for past dates
     * false for future date
     * date: string UTC format
     */
    isPastDate: async function (date) {}
    /**
     * makes get event by id API call
     */
    fetchEvent: async function () {}
    /**
     * Verifies if the current user is authorise to delete the event
     * if so set the isAuthorized variable to true
     */
    isAuthorizedToDelete: async function () {}
}
```
#### Watchers
``` js
/** NONE USED **/
```
#### Components
``` js
components: {
  // component from npm vue-google-login package
    GoogleLogin
  }
```
#### Lifecycle hooks
``` js
/**
 * Called after the instance has been mounted, 
 * where el is replaced by the newly created vm.$el
 * calls  the fetchEvent() method and isAutorizedToDelete()
 */
async mounted () {}
```

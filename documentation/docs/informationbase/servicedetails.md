---
title: ServiceDetails.vue
lang: en-US
---
# ServiceDetails.vue
## Component Information
### Component view
![Login component view](/docs/dashboard/ServiceDetails.PNG)
Service Details Component View
### Expected Behaviour
The service details component shows in more detail a clicked service from room services list.


## Vue Instance
#### Imports
``` js

```
#### Data Properties
``` js
    // When a Vue instance is created, it adds all the properties  
    // found in its data object to Vue’s reactivity system
    data: () => ({
    noDataAvailable: false, //  boolean value used to control templat elements to be rendered
    // default service object
    service: { 
        numbers: '', 
        room: { 
            building: { 
                babbrev: '', 
                bcommonname: '', 
                bid: 1, 
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
        roccupancy: 0 
        }, 
    sdescription: '',
    sid: 0, 
    sname: '', 
    sschedule: '', 
    websites: '' 
    },
    filteredServicesList: [],
    formInputPhoneNumber: null,
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
    fetchService: async function () {}
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
 * calls method fetchService()
 */
async mounted () {}
```

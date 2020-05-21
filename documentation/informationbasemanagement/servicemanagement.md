---
title: ServiceManagement.vue
lang: en-US
---
# ServiceManagement.vue
## Component Information
### Component view
![Service Management component view](/ServiceManagement.PNG)
Service Management View

![Service Creation component view](/ServiceManagementForm.PNG)
Service Creation Form  

![Service Creation component view](/ServiceManagementEditForm.PNG)
Service Edit Form 

![Service Websites component view](/ServiceManagementWebsitesForm.PNG)
Service Edit Websites Form

![Service Websites component view](/ServiceManagementPhonesForm.PNG)
Service Edit Phones Form

### Expected Behaviour
The component allows the user to access services in the system, the user can create or edit services, also can add phone numbers and websites to existing services.  


## Vue Instance
#### Imports
``` js
import { mapGetters } from 'vuex'
```
#### Data Properties
``` js
    // When a Vue instance is created, it adds all the properties  
    // found in its data object to Vue’s reactivity system
    data: () => ({
    search: '', // 
    validService: true,
    validWebsite: true,
    validPhone: true,
    validServicePhone: true,
    validServicewebsite: true,
    dialog: false,
    websiteFormInput: '',
    websiteDescriptionFormInput: '',
    removedWebsitesList: [],
    phoneNumberFormInput: '',
    phoneTypeSelectList: ['Extension', 'Mobile', 'Fax'],
    phoneTypeSelected: '',
    removedPhoneNumbers: [],
    buildingSelectList: [],
    floorSelectList: [],
    buildingObjectsList: [],
    roomsSelectList: [],
    roomObjectsList: [],

    headers: [
      { text: 'Service Name', align: 'start', sortable: true, value: 'sname' },
      { text: 'Building', value: 'room.building.bname', sortable: false },
      { text: 'Room', value: 'room.rcode', sortable: false },
      { text: 'schedule', value: 'sschedule', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    serviceObjectsList: [],
    editedServiceObjectIndex: -1,
    editedServiceObject: {
      numbers: [],
      room: {
        building: {
          babbrev: '',
          bcommonname: '',
          bid: null,
          bname: '',
          btype: '',
          distinctfloors: [],
          numfloors: null,
          photourl: ''
        },
        photourl: '',
        raltitude: null,
        rcode: '',
        rcustodian: '',
        rdept: '',
        rdescription: '',
        rfloor: null,
        rid: null,
        rlatitude: null,
        rlongitude: null,
        roccupancy: null
      },
      sdescription: '',
      sid: null,
      sname: '',
      sschedule: '',
      websites: []
    },
    defaultServiceObject: {
      numbers: [],
      room: {
        building: {
          babbrev: '',
          bcommonname: '',
          bid: null,
          bname: '',
          btype: '',
          distinctfloors: [],
          numfloors: null,
          photourl: ''
        },
        photourl: '',
        raltitude: null,
        rcode: '',
        rcustodian: '',
        rdept: '',
        rdescription: '',
        rfloor: null,
        rid: null,
        rlatitude: null,
        rlongitude: null,
        roccupancy: null
      },
      sdescription: '',
      sid: null,
      sname: '',
      sschedule: '',
      websites: []
    },
    websiteDialog: false,
    websitestoRemoveDialog: false,
    phonesDialog: false,
    phonestoRemoveDialog: false
  })
```
#### Computed properties 
``` js
 computed: {
     /**
      * 
      */
     ...mapGetters([
      'uid'
    ])
     /**
      * return the title of the the edit/update form
      */
     formTitle () {}
 }
```

#### Methods
``` js
methods: {
    /**
     * fetc system services 
     */
    fetchServices: async function () {}
    /**
     * save any changes to a service 
     */
    editServiceObject: function (item, view) {}
    /**
     * close the form and reset any changes made to the opened form
     */
    close (type) {}
    /**
     * delete service from the system
     */
    deleteServiceObject: async function (item) {}
    /**
     * save changes to the system from  a form
     */
    save: async function () {}
    /**
     * validate form inputs whn called
     */
    validate: function (type) {}
    /**
     * fetch system buildings
     */
    fetchBuildings: async function () {}
    /**
     * fetch system rooms
     */
    fetchRooms: async function () {}
    /**
     * create a new service in the system
     */
    createService: async function () {}
    /**
     *  save in the system any edits to a service 
     */
    editService: async function () {}
    /**
     * add phone numbers to aservice in the system
     */
    addNumberToService: async function () {}
    /**
     * add phone numbers to a list but do not save them in the system
     */
    addNumberToList: function () {}
    /**
     *  remove phone numbes from the list
     */
    removeNumberFromList: function () {}
    /**
     * remove phone numbers from the system 
     */
    removeNumberFromService: async function () {}
    /**
     * add websites to a service in the system
     */
    addWebsiteToService: async function () {}
    /**
     * add website to a list but not save it to the sistem
     */
    addWebsiteToList: function () {}
    /**
     *  remove websites list from the system 
     */
    removeWebsiteFromService: async function () {}
    /**
     * remove website from list but do not delete them from the system
     */
    removeWebsiteFromList: function () {}
    /**
     * clear validation
     */
    clearValdation: function () {}

}

```
#### Watchers
``` js
watch: {
    /**
     * watches for changes in the select list of buildings
     * if any changes occurs updates the floor and room select list
     */
    'editedServiceObject.room.building.bname': async function () {}
    /**
     * * watches for changes in the select list of floors
     * if any changes occurs updates the  room select list
     */
    'editedServiceObject.room.rfloor': async function () {}
    /**
     * watches for changes in the select list of rooms
     */
    'editedServiceObject.room.rcode': function () {}
    /**
     * controls the dialog of the create and edit service form
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
 * call methods fetchBuildings() and fetchServices()
 */
async mounted () {}
```
#### directives
``` js 
directives: {
    /**
     *  activates when a user clicks outsite of the template element binded to th edirective
     * clears the validation of the template element
     */
    'click-outside': {}
}
```
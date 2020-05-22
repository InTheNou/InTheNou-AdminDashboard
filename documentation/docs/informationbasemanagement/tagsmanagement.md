---
title: TagsManagement.vue
lang: en-US
---
# TagsManagement.vue
## Component Information
### Component view
![Tags Management component view](/docs/dashboard/TagsManagement.PNG)
Tags Management View

![New Tag Form view](/docs/dashboard/newTagForm.PNG)
New Tag Form View

![Edit Tag Form view](/docs/dashboard/EditTagForm.PNG)
Edit Tag Form View

### Expected Behaviour
The component allows the user to access tags in the system, the user can edit or create new tags. 


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
    headers: [
      { text: 'Tags', align: 'start', sortable: true, value: 'tname' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    tagObjectsList: [],
    editedTagObjectIndex: -1,
    editedTagObject: {
      tid: 0,
      tname: ''
    },
    defaultTagObject: {
      tid: 0,
      tname: ''
    }
  })
```
#### Computed properties 
``` js
 computed: {
     /**
      * returns the title of the edit/create new tag form
      */
     formTitle() {}
 }
```

#### Methods
``` js
methods: {
    /**
     * validates the form 
     */
    validate: function () {}
    /**
     * fetch systems all tags
     */
    fetchTags: async function () {}
    /**
     *  open tag edit form
     */
    editTagObject (item) {}
    /**
     * close tag forms without saving edits
     */
    close () {}
    /**
     * save form inputs to the system
     */
    save: async function () {}
}

```
#### Watchers
``` js
watch: {
    /**
     * controls the dialog of the create and edit tag form
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
  * calls method fetchTags()
 */
async computed () {}
```

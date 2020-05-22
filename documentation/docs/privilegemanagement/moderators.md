---
title: Moderators.vue
lang: en-US
---
# Moderators.vue 
## Component Information
### Component view
![navigation bar component view](/docs/dashboard/Moderators.PNG)
Navigation bar view

![navigation bar component view](/docs/dashboard/NabarDrawer.PNG)
Navigation drawer view for an administrator user

### Expected Behaviour
The component shows a list of delegated moderators users of the current logged user, which is an adminitrator user.

## Vue Instance
#### Imports
``` js
import ModeratorPrivilegeManagementView from './PrivilegeManagement.vue'
```
#### Data Properties
``` js
/** NONE USED **/
```
#### Computed properties 
``` js
/** NONE USED **/ 
```

#### Methods
``` js
methods: {

```
#### Watchers
``` js
/** NONE USED **/
```
#### Components
``` js
components: {
    'p-m-v': ModeratorPrivilegeManagementView // instance of the import of the component PrivilegeManegement.vue, used for the tags above
  }
  
```
#### Lifecycle hooks
``` js
/** NONE USED **/
```

<!-- the next template represents the view of an administrator user for managing user privileges  in the system-->
<!-- administrator can see all event creators and moderators in the system -->
<template>
    <!-- the privilege management view tag is used for displaying the privilege controls module-->
    <!-- <p-m-v viewtype=('moderator','eventcreator')></p-m-v> the optinos are used to display either moderators or event creators -->
    <p-m-v viewtype='eventcreator'  ></p-m-v>
</template>

<script>
import ModeratorPrivilegeManagementView from './PrivilegeManagement.vue'
export default {
  components: {
    'p-m-v': ModeratorPrivilegeManagementView // instance of the import of the component PrivilegeManegement.vue, used for the tags above
  }
}
</script>

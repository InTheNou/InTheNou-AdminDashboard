<template>

  <v-row align ="center" justify="center" no-gutters style="height: 150px;"> 
    <moderator-priveleges></moderator-priveleges>
    <event-creator-priveleges></event-creator-priveleges>
  </v-row>

</template>

<script>
 import EventCreatorPrivileges from './EventCreatorPrivileges.vue'
 import ModeratorPriveleges from './ModeratorPrivileges.vue'

  export default {
    components:{
      'event-creator-priveleges': EventCreatorPrivileges,
      'moderator-priveleges': ModeratorPriveleges
    }
  }
</script>

<template>
  <v-row align ="center" justify="center" no-gutters style="height: 150px;" >
      <v-col cols="3">
       <service-management></service-management>
       </v-col>
       <v-col cols="3">
         <tags-management></tags-management>
       </v-col>
  </v-row>
</template>
<script>
import ServiceManagement from '../informationbasemanagement/ServiceManagement.vue'
import TagsManagement from '../informationbasemanagement/TagsManagement.vue'
export default {
  components: {
    'service-management': ServiceManagement,
    'tags-management': TagsManagement
  }
}
</script>

<template>
  <div>
    <container ></container>

      <service-management></service-management>
      <tags-management></tags-management>

  </div>
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

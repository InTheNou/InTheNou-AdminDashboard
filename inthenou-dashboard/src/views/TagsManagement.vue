<template>
    <v-content>
      <nav-bar></nav-bar>
      <tags-management-view></tags-management-view>
    </v-content>
</template>
<script>
import Navbar from '../components/utils/Navbar.vue'
import TagsManagement from '../components/informationbasemanagement/TagsManagement.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'tags-management-view': TagsManagement
  }
}
</script>

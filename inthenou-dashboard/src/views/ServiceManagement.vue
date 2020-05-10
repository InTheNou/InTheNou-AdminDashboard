<template>
    <v-content>
      <nav-bar></nav-bar>
      <service-management-view></service-management-view>
    </v-content>
</template>

<script>
import Navbar from '../components/utils/Navbar.vue'
import serviceManagement from '../components/informationbasemanagement/ServiceManagement'
export default {
  components: {
    'nav-bar': Navbar,
    'service-management-view': serviceManagement
  }
}
</script>

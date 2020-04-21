<template>
    <v-content>
      <nav-bar></nav-bar>
      <information-base-management></information-base-management>
    </v-content>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import InformationBaseManagement from '../components/informationbasemanagement/InformationBaseManagement.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'information-base-management': InformationBaseManagement
  }
}
</script>

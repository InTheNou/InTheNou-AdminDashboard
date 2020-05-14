<template>
  <v-content>
    <nav-bar></nav-bar>
    <moderator-privilege-management-view ></moderator-privilege-management-view>
  </v-content>
</template>

<script>
// verifies if the user is either and admin or moderator using UID
import Navbar from '../components/utils/Navbar.vue'
import ModeratorView from '../components/privilegemanagement/Moderators.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'moderator-privilege-management-view': ModeratorView
  }
}
</script>

<template>
  <div>
    <nav-bar></nav-bar>
      <v-container class="grey lighten-5 mb-6">
        <moderator-delegated-users-view></moderator-delegated-users-view>
      </v-container>
  </div>
</template>

<script>
// verifies if the user is either and admin or moderator using UID
import Navbar from '../components/Navbar.vue'
import DelegatedUsers from '../components/privilegemanagement/DelegatedUsers.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'moderator-delegated-users-view': DelegatedUsers
  }
}
</script>

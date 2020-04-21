<template>
  <v-content class="grey lighten-5 ">
    <nav-bar></nav-bar>
    <administrator-privilege-management-view    v-if="'administrator'==checkPrivileges('1')"></administrator-privilege-management-view>
    <moderator-privilege-management-view       v-else-if="'moderator'==checkPrivileges('3')"></moderator-privilege-management-view>
  </v-content>
</template>

<script>
// verifies if the user is either and admin or moderator using UID
import Navbar from '../components/Navbar.vue'
import AdministratorView from '../components/privilegemanagement/AdministratorPrivilegeManagement.vue'
import ModeratorView from '../components/privilegemanagement/ModeratorPrivilegeManagement.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'administrator-privilege-management-view': AdministratorView,
    'moderator-privilege-management-view': ModeratorView
  },
  methods: {
    checkPrivileges (userID) {
      if (userID === '1') {
        return 'administrator'
      } else return 'none'
    }
  },
  mounted () {
  }

}
</script>

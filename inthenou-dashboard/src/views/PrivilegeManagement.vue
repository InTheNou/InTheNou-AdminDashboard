<template>
<v-container style="max-width: 600px;">
  <v-row>
    <nav-bar></nav-bar>
    <administrator-privilege-management-view    v-if="roleid=='4'"></administrator-privilege-management-view>
    <moderator-privilege-management-view       v-else-if="roleid=='3'"></moderator-privilege-management-view>
  </v-row>
</v-container>
</template>

<script>
// verifies if the user is either and admin or moderator using UID
import Navbar from '../components/utils/Navbar.vue'
import AdministratorView from '../components/privilegemanagement/AdministratorPrivilegeManagement.vue'
import ModeratorView from '../components/privilegemanagement/ModeratorPrivilegeManagement.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    'nav-bar': Navbar,
    'administrator-privilege-management-view': AdministratorView,
    'moderator-privilege-management-view': ModeratorView
  },
  computed: {
    ...mapGetters([
      'roleid'
    ])
  }
}
</script>

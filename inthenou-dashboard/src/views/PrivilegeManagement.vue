<template>
<v-container style="max-width: 1200px;">
  <v-row>
  <v-col>
    <nav-bar></nav-bar>
    <v-col v-if="roleid=='4'" sm="12" md="6">
    <administrator-privilege-management-view ></administrator-privilege-management-view>
    </v-col>
    <v-col v-else-if="roleid=='3'" sm="12" md="6">
    <moderator-privilege-management-view ></moderator-privilege-management-view>
    </v-col>
  </v-col>
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

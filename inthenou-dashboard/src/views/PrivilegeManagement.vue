<template>
<div>
  <v-container class="grey lighten-5 mb-6">

    <administrator-privilege-management-view    v-if="'administrator'==checkPrivileges('1')"></administrator-privilege-management-view>
    <moderator-privilege-management-view       v-else-if="'moderator'==checkPrivileges('3')"></moderator-privilege-management-view>

    </v-container>
  </div>
</template>

<script>
// verifies if the user is either and admin or moderator using UID
import AdministratorView from '../components/privilegemanagement/AdministratorPrivilegeManagement.vue'
import ModeratorView from '../components/privilegemanagement/ModeratorPrivilegeManagement.vue'
export default {
  components: {
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

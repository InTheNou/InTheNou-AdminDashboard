<template>
    <div>
        <v-container class="grey lighten-5 mb-6">
         <moderator-privilege-management-view></moderator-privilege-management-view>
        </v-container>
    </div>
</template>

<script>
// verifies if the user is either and admin or moderator using UID
import ModeratorView from '../components/privilegemanagement/ModeratorPrivilegeManagement.vue'
export default {
  components: {
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

<template>
<div>
  <v-container class="grey lighten-5 mb-6">
    <administrator-privilege-management-view></administrator-privilege-management-view>

    </v-container>
  </div> 
</template>

<script>
 import AdministratorView from '../components/privilegemanagement/AdministratorPrivilegeManagement.vue'
 export default {
    components:{
      'administrator-privilege-management-view': AdministratorView
    }
    
  }
</script>
Discover
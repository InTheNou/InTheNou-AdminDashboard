<template>
    <v-content>
      <nav-bar></nav-bar>
      <service-detail-view></service-detail-view>
    </v-content>
</template>
<script>
import Navbar from '../components/utils/Navbar.vue'
import ServiceDetail from '../components/informationbase/ServiceDetails.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'service-detail-view': ServiceDetail
  }
}
</script>

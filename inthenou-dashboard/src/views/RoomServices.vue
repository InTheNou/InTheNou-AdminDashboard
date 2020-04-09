<template>
    <div>
        <nav-bar></nav-bar>
        <room-services></room-services>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import RoomServices from '../components/informationbase/RoomServices.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'room-services': RoomServices
  }
}
</script>

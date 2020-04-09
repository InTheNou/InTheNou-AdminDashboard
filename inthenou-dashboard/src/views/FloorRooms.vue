<template>
    <div>
        <nav-bar></nav-bar>
        <floor-rooms></floor-rooms>
    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import FloorRooms from '../components/informationbase/FloorRooms.vue'
export default {
  components: {
    'nav-bar': Navbar,
    'floor-rooms': FloorRooms
  }
}
</script>

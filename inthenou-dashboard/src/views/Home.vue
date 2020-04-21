<template>
<div>
  <v-content>
  </v-content>
</div>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    uid: null
  }),
  mounted () {
    this.uid = this.$route.params.uid
    document.cookie = 'uid=' + this.uid
  }
}
</script>

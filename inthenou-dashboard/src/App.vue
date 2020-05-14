<template>
    <v-app>
      <v-container
        fluid
        fill-height
        class="pt-0 pb-0"
      >
        <v-layout>
        <router-view></router-view>
        </v-layout>
      </v-container>
    </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

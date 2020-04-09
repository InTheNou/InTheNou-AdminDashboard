<template>
<nav>
  <v-app-bar
      text
      app
      color = "blue darken-4"
    >
    <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase grey--text">
            <h1>In<span style="color:red">The</span>Nou</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <log-out></log-out>
    </v-app-bar >
    <v-navigation-drawer app v-model="drawer" >
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="title">

            </v-list-item-title>
            <v-list-item-subtitle>

            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
            <v-list-item
            v-for="link in items"
            :key="link.title"
            link
            router :to="link.route"
            >
            <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

</nav>
</template>
<script>
import Logout from '../components/auth/logout.vue'
export default {
  data () {
    return {
      drawer: false,
      items: [
        { title: 'All Current Events', icon: 'mdi-calendar', route: '/allcurrentevents' },
        { title: 'All Events Archive', icon: 'mdi-history', route: 'alleventsarchive' },
        { title: 'My Events ', icon: 'mdi-calendar', route: '/myevents' },
        { title: 'My Events Archive', icon: 'mdi-history', route: '/myeventsarchive' },
        { title: 'Privilege Management', icon: 'mdi-account-key-outline', route: '/privilegemanagement' },
        { title: 'Information Base', icon: 'mdi-database', route: '/informationbase' },
        { title: 'Information Base Management', icon: 'mdi-desktop-mac-dashboard', route: '/informationbasemanagement' }
      ],
      color: 'primary',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal'
      ],
      right: true,
      miniVariant: false,
      expandOnHover: false,
      background: false
    }
  },
  computed: {
    bg () {
      return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
    }
  },
  components: {
    'log-out': Logout
  }
}
</script>

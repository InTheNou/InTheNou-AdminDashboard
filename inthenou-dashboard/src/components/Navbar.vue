<template>
    <v-container>
        <v-app-bar
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          app
          color="blue darken-3"
          dark
        >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
          <v-toolbar-title
            style="width: 300px"
            class="ml-0 pl-4"
          >
            <span class="hidden-sm-and-down"><h1>In<span style="color:red">The</span>Nou</h1></span>
          </v-toolbar-title>
          <v-text-field
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
            class="hidden-sm-and-down"
          />
          <v-spacer />
          <log-out></log-out>
        </v-app-bar>
        <v-navigation-drawer
          v-model="drawer"
          :clipped="$vuetify.breakpoint.lgAndUp"
          app
        >
          <v-list dense>
            <template v-for="item in items">
              <v-row
                v-if="item.heading"
                :key="item.heading"
                align="center"
              >
                <v-col cols="6">
                  <v-subheader v-if="item.heading">
                    {{ item.heading }}
                  </v-subheader>
                </v-col>
                <v-col
                  cols="6"
                  class="text-center"
                >
                  <a
                    href="#!"
                    class="body-2 black--text"
                  >EDIT</a>
                </v-col>
              </v-row>
              <v-list-group
                v-else-if="item.children"
                :key="item.text"
                v-model="item.model"
                :prepend-icon="item.model ? item.icon : item['icon-alt']"
                append-icon=""
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.text }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="(child, i) in item.children"
                  :key="i"
                  link
                  router :to="child.route"
                >
                  <v-list-item-action v-if="child.icon">
                    <v-icon>{{ child.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ child.text }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <v-list-item
                v-else
                :key="item.text"
                link
                router :to="link.route"
              >
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-navigation-drawer>
    </v-container>
</template>
<script>
import Logout from './auth/logout.vue'
export default {
  data: () => ({
    drawer: null,
    items: [
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Events',
        model: true,
        children: [
          { text: 'Current Events', icon: 'mdi-calendar', route: '/allcurrentevents' },
          { text: 'Events Archive', icon: 'mdi-history', route: 'alleventsarchive' },
          { text: 'My Events ', icon: 'mdi-calendar', route: '/myevents' },
          { text: 'My Events Archive', icon: 'mdi-history', route: '/myeventsarchive' }
        ]
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Information Base',
        model: true,
        children: [
          { text: 'Navigation', icon: 'mdi-database', route: '/informationbase' },
          { text: 'Management', icon: 'mdi-desktop-mac-dashboard', route: '/informationbasemanagement' }
        ]
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Privilege',
        model: true,
        children: [
          { text: 'Management', icon: 'mdi-account-key-outline', route: '/privilegemanagement' }
        ]
      }
    ],
    color: 'primary',
    colors: [
      'primary',
      'blue',
      'success',
      'red',
      'teal'
    ]
  }),
  components: {
    'log-out': Logout
  }
}
</script>

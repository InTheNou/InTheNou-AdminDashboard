import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './router/routes.js'
import store from './store/Store.js'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate' // package for validation purposes
import VueResource from 'vue-resource'
import Vuex from 'vuex'

Vue.use(VueRouter) // inject package for use in the set up
Vue.use(VueResource) // inject package for use in the set up
Vue.use(Vuelidate) // inject package for use in the set up
Vue.config.productionTip = false
Vue.use(Vuex)
const router = new VueRouter({
  //  the routes are added to the vue root instance
  routes,
  mode: 'hash',
  base: process.env.BASE_URL
})

new Vue({
  router,
  //  the store is added to the vue root instance
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

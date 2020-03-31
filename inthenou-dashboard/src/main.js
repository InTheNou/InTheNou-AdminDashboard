import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './router/routes.js'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate' // package for validation purposes
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuelidate) // inject package for use in the set up
Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'hash',
  base: process.env.BASE_URL
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

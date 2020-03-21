import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate' //package for validation purposes
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(Vuelidate)//inject package for use in the set up
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

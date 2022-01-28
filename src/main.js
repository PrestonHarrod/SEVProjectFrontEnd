import Vue from "vue";
import App from "./App.vue";
import router from './router'
import store from './store/store.js'

import GoogleAuth from '@/config/google_oAuth.js'
const gauthOption = {
  clientId: '738583612295-7lvrgo65m2qnpq05eg20turnoamher1l.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

//Vue.config.productionTip = false;

Vue.use(GoogleAuth, gauthOption)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

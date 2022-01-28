import Vue from 'vue'
import Router from 'vue-router'

import Home from "./views/Home.vue"
import Login from "./views/Login.vue"

Vue.use(Router)
export default new Router({
  mode: 'history',
  base:
  process.env.NODE_ENV === "development" ? "/" : "/tutorapp/",
  routes : [
    
    {
      path: '/',
      name: 'home',
      component: Home
    },
   
   
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    ]
})
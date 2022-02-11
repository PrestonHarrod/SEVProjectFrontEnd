import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import SessionList from "./views/Sessions.vue"
import TutorAddSubjects from "./views/TutorAddSubject.vue"

Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === "development" ? "/" : "/tutorapp/",
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
    },

    {
      path: "/login",
      name: "login",
      component: Login,
    },

    {
      path: "/sessions",
      name: "sessionlist",
      component: SessionList,
    },
    {
      path: "/addsubjects",
      name: "addSubjects",
      component: TutorAddSubjects,
    },
  ],
});

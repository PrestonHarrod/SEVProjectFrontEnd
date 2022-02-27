<template>
  <nav id="vue">
    <div class="menu-item" v-on:click.prevent="goToHome()">Home</div>
    <AdminServices title="Admin" />
    <SupervisorServices title="Supervisor"/>
    <TutorServices title="Tutor" />
    <StudentServices title="Student" />
    <div class="menu-item" v-on:click.prevent="goToLogin()">Logout</div>
  </nav>
</template>

<script>
import AdminServices from "../components/adminServices";
import StudentServices from "../components/studentServices";
import TutorServices from "../components/tutorServices";
import SupervisorServices from "../components/supervisorServices";
// Import Utils from ""
export default {
  name: "navbar",
  components: {
    AdminServices,
    TutorServices,
    StudentServices,
    SupervisorServices
  },
  methods: {
    goToHome() {
      this.$router
        .push({ name: "home" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToLogin() {
      if (this.user == null) {
        this.$router.push({ name: "login" }).catch((error) => {
          console.log(error);
        });
      } else {
        // Utils.setStore("user", null); //needs utils
        this.$router.push({ name: "home" });
        location.reload();
      }
    },
  },
};

//functions for site traversal
</script>

<style>
nav {
  width: 100vw;
  background-color: #0d0d0e;
  display: flex;
  align-items: center;
  justify-content: center;
}
nav .menu-item {
  color: #fff;
  padding: 25px 40px;
  position: relative;
  text-align: center;
  border-bottom: 5px solid transparent;
  display: flex;
  transition: 0.4s;
}
nav .menu-item.active,
nav .menu-item:hover {
  background-color: #232325;
  border-bottom-color: #1976d2;
}
nav .menu-item a {
  color: inherit;
  text-decoration: none;
}
</style>

<template>
  <nav id="vue">
    <div class="menu-item" v-on:click.prevent="goToHome()">Home</div>
    <AdminServices title="Admin" v-if="this.getAuth(1)" />
    <SupervisorServices title="Supervisor" v-if="this.getAuth(1)" />
    <SupervisorServices title="Supervisor" v-else-if="this.getAuth(2)" />
    <TutorServices title="Tutor" v-if="this.getAuth(3)" />
    <StudentServices title="Student" v-if="this.getAuth(3)" />
    <StudentServices title="Student" v-else-if="this.getAuth(4)" />
    <div class="menu-item" v-on:click.prevent="goToLogin()">Logout</div>
  </nav>
</template>

<script>
import AdminServices from "../components/adminServices";
import StudentServices from "../components/studentServices";
import TutorServices from "../components/tutorServices";
import SupervisorServices from "../components/supervisorServices";
//import UserRoleServices from "@/services/userRoleServices.js";

import Utils from "@/config/utils.js";
export default {
  name: "navbar",
  components: {
    AdminServices,
    TutorServices,
    StudentServices,
    SupervisorServices,
  },
  data: () => ({
    user: {},
    roles: [],
  }),
   beforeCreate() {
    this.user = Utils.getStore("user"); //gets the user that is logged in
    //the users roles should already be in there

    // let id = this.user.userID;
    // await UserRoleServices.getRolesFromUser(id)
    //   .then((response) => {
    //     let roleResponse = response.data;
    //     for (let i = 0; i < roleResponse.length; i++) {
    //       console.log("Role " + i + " is :" + this.roles[i]);
    //       this.roles[i] = roleResponse[i].roleID;
    //     } //sets the roles for an array of ints. used by getauth to hide and show available features
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   }); //get all userRoles and store in Roles{}
    //   console.log('after await: ' + this.roles);
  },
  methods: {
    goToHome() {
      this.$router
        .push({ name: "/" })
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
        Utils.setStore("user", null); //needs utils
        this.$router.push({ name: "login" });
      }
    },
    getAuth(num) {
      return this.roles.includes(num); //return if it includes the role responsible
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

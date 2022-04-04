

<template>
  <nav id="vue">
    <div class="menu-item" v-on:click.prevent="goToHome()">Home</div>
    <AdminServices title="Admin" v-if="this.getAuth(1)" />
    <SupervisorServices title="Supervisor" v-if="this.getAuth(1)" />
    <SupervisorServices title="Supervisor" v-else-if="this.getAuth(2)" />
    <TutorServices title="Tutor" v-if="this.getAuth(3)" />
    <StudentServices title="Student" v-if="this.getAuth(3)" />
    <StudentServices title="Student" v-else-if="this.getAuth(4)" />
    <div class="menu-item" v-on:click.prevent="goToOrgSelect()">
      Switch Organization
    </div>
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
import { mdiAccount } from "@mdi/js";

export default {
  data: () => ({
    icons: {
      mdiAccount,
    },
  }),
  name: "navbar",
  components: {
    AdminServices,
    TutorServices,
    StudentServices,
    SupervisorServices,
  },
  created() {
    this.user = Utils.getStore("user"); //gets the user that is logged in

  },
  methods: {
    goToProfile() {
      this.user = Utils.getStore("user");
      let id = this.user.userID;
      if (this.user != null) {
        this.$router.push({ name: "userprofile", params: id });
      }
    },
    goToOrgSelect() {
      this.$router.push({ name: "selectOrg" });
    },
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
        Utils.setStore("user", null); //needs utils
        this.$router.push({ name: "login" });
      }
    },
    getAuth(num) {
      console.log("roles: " + this.user.roles);
      console.log("orgs: " + this.user.orgs);
      return this.user.roles.includes(num); //return if it includes the role responsible
    },
    orgTextCheck() {
      var org = Utils.getStore("currentOrg");
      switch (org) {
        case 1:
          document.getElementById("orgText").innerHTML = "Student Success";
          break;
        case 2:
          document.getElementById("orgText").innerHTML = "Writing Center";
          break;
        case 3:
          document.getElementById("orgText").innerHTML = "New College";
          break;
        default:
          document.getElementById("orgText").innerHTML =
            "Welcome to the Team 3 Website";
      }
    },
  },
};

//functions for site traversal
</script>

<style>
</style>

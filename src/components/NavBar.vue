

<template>
  <nav id="vue">
      <div class="menu-item" @click="isOpen = !isOpen">
        Org: {{ orgText }}
    <svg viewBox="0 0 1030 638" width="10">
      <path
        d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
        fill="#FFF"
      ></path>
    </svg>
    <transition name="fade" apear>
      <div class="sub-menu" v-if="isOpen">
        <div class="menu-item" v-if="orgText != 'Student Success' && getOrgs(1)" v-on:click.prevent="changeOrg(1)">
          Student Success
        </div>
        <div class="menu-item" v-if="orgText != 'Writing Center' && getOrgs(2)" v-on:click.prevent="changeOrg(2)">
          Writing Center
        </div>
        <div class="menu-item" v-if="orgText != 'New College' && getOrgs(3)" v-on:click.prevent="changeOrg(3)">
          New College
        </div>
      </div>
    </transition>
  </div>
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
import organizationServices from "@/services/organizationServices";
//import UserRoleServices from "@/services/userRoleServices.js";
import Utils from "@/config/utils.js";
import { mdiAccount } from "@mdi/js";

export default {
  data: () => ({
    icons: {
      mdiAccount,
    },
    orgText: "",
    isOpen: false,
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
    organizationServices.getOrg(Utils.getStore("currentOrg")).then((org) => {
      console.log("Org Name: " + org.data.name);
      this.orgText = org.data.name;
    });
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
    changeOrg(orgNum) {
      organizationServices.getOrg(orgNum).then((org) => {
      console.log("Org Name: " + org.data.name);
      this.orgText = org.data.name;
      Utils.setStore("currentOrg", orgNum);
      this.$router.go();
    });
    },
    getOrgs(num) {
      console.log("orgs: " + this.user.orgs);
      return this.user.orgs.includes(num); //return if it includes the role responsible
    },
  },
};

//functions for site traversal
</script>

<style>
</style>

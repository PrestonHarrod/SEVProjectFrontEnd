<template>
  <!-- 
This class is now archived and unused in the current system.
Use this template for the current nav bar and implement athorization 
using this former component

-Jared
 -->

  <v-app-bar>
    <button v-on:click.prevent="goToHome()">
      <img
        alt="Vue logo"
        src="../assets/logo.png"
        contain
        height="50"
        width="80"
      />
    </button>
    <v-btn text v-on:click.prevent="goToTutorPage()"> Tutor </v-btn>
    <v-btn text v-on:click.prevent="goToStudentPage()"> Student </v-btn>
    <v-btn text v-on:click.prevent="goToAdminPage()"> Admin </v-btn>
    <v-btn text v-if="getAuth() > 0" v-on:click.prevent="goToStudents()">
      Tutor
    </v-btn>
    <!-- removed for demo purposes v-if='getAuth() > 0' -->

    <v-btn v-if="getAuth() == 0" text v-on:click.prevent="goToLogin()">
      Login
    </v-btn>
    <v-btn v-else text v-on:click.prevent="goToLogin()"> Logout </v-btn>
    <v-btn text v-on:click.prevent="scheduleSession()">
      Schedule Session
    </v-btn>
    <v-btn text v-on:click.prevent="goToSessions()"> View Sessions </v-btn>
    <v-btn text v-on:click.prevent="goToAddSubjects()"> Manage Subjects </v-btn>
  </v-app-bar>
</template>

<script>
import Utils from "../config/utils.js";
export default {
  data: () => ({
    user: {},
  }),
  created() {
    this.user = Utils.getStore("user");
  },
  methods: {
    getAuth() {
      if (this.user == null) return 0;
      else if (this.user.advisorID != null) return 2;
      else return 1;
    },
    goToHome() {
      this.$router
        .push({ name: "home" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    scheduleSession() {
      this.$router.push({ name: "studentSubjectView" }).then(() => {});
    },
    goToCourses() {
      this.$router
        .push({ name: "courses" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToStudents() {
      this.$router
        .push({ name: "studentlist" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },

    goToStudentPage() {
      this.$router.push({ name: "studentHome" });
    },
    goToAdvisors() {
      this.$router
        .push({ name: "advisorlist" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToAdminPage() {
      this.$router
        .push({ name: "adminHome" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToSessions() {
      this.$router.push({ name: "sessionlist" });
    },
    goToTutorPage() {
      this.$router
        .push({ name: "tutorHome" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToLogin() {
      if (this.user == null) {
        console.log("testing");
        this.$router.push({ name: "login" }).catch((error) => {
          console.log(error);
        });
      } else {
        Utils.setStore("user", null);
        this.$router.push({ name: "home" });
        location.reload();
      }
    },
    goToAddSubjects() {
      this.$router
        .push({ name: "addSubjects" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

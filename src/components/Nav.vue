<template>
<!-- 
This class is now archived and unused in the current system.
Use this template for the current nav bar and implement athorization 
using this former component

-Jared
 -->

    <v-app-bar >
    <button v-on:click.prevent="goToHome()">
      <img alt="Vue logo" src="../assets/logo.png" contain height="50" width="80"> 
    </button>
    <v-btn text  v-on:click.prevent="goToTutorPage()">
      Tutor
    </v-btn>
    <v-btn text  v-on:click.prevent="goToStudentPage()">
      Student
    </v-btn>
    <v-btn text  v-on:click.prevent="goToAdminPage()">
      Admin
    </v-btn>
    <!-- removed for demo purposes v-if='getAuth() > 0' -->

    <v-btn v-if='getAuth() == 0' text v-on:click.prevent="goToLogin()">
      Login
    </v-btn>
    <v-btn v-else text v-on:click.prevent="goToLogin()">
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
import Utils from '../config/utils.js';
export default ({
    data: () => ({
      user: {},
    }),
    created() {
        this.user = Utils.getStore('user');
    },
    methods: {
      getAuth() {
        if(this.user == null)
          return 0;
        else if(this.user.advisorID != null)  
          return 2;
        else
          return 1;
      },
      goToHome() {
          this.$router.push({ name: 'home'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      }, 
      goToStudentPage() {
          this.$router.push({ name: 'studentHome'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      },
      goToAdminPage() {
          this.$router.push({ name: 'adminHome'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      },
       goToTutorPage() {
          this.$router.push({ name: 'tutorHome'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      },
      goToLogin() {
        if(this.user == null){
        console.log('testing');
          this.$router.push({ name: 'Login'})
          .catch(error => {
            console.log(error)
          })
        }
        else {
          Utils.setStore('user', null)
          this.$router.push({ name: 'home'})
          location.reload();
        }
      },
    }
});
</script>

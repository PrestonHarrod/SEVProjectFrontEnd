<template>
    <v-app-bar >
    <button v-on:click.prevent="goToHome()">
      <img alt="Vue logo" src="../assets/logo.png" contain height="50" width="80">
    </button>
    <v-btn text v-if='getAuth() > 0' v-on:click.prevent="goToStudents()">
      Tutor
    </v-btn>
    <v-btn v-if='getAuth() == 0' text v-on:click.prevent="goToLogin()">
      Login
    </v-btn>
    <v-btn v-else text v-on:click.prevent="goToLogin()">
      Logout
    </v-btn>
    <v-btn text v-on:click.prevent="scheduleSession()">
      Schedule Session
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
      scheduleSession() {
          this.$router.push({ name: 'studentSubjectView'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      },
      goToSessions() {
          this.$router.push({ name: 'sessionlist'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      },
      goToLogin() {
        if(this.user == null){
        console.log('testing');
          this.$router.push({ name: 'login'})
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
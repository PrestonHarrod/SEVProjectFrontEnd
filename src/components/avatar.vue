<template>
    <v-row justify="left">
      <v-menu
        min-width="200px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >
            <v-avatar
              color="#1976d2"
              size="48"
            >
              <span class="white--text text-h5">{{ firstInitial }}{{lastInitial }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="#1976d2"
              >
                <span class="white--text text-h5">{{ firstInitial }}{{lastInitial }}</span>
              </v-avatar>
              <p class="text-caption mt-1">
                {{ users.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="goToProfile()"
                depressed
                rounded
                text
              >
                Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="goToLogout()"
                depressed
                rounded
                text
              >
                Contracts
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="goToLogout()"
                depressed
                rounded
                text
              >
                Become a Tutor
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="goToLogout()"
                depressed
                rounded
                text
              >
                Contact Office
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="goToLogout()"
                depressed
                rounded
                text
              >
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
   </template>

<script>
import Utils from '@/config/utils.js';
import UserServices from "@/services/UserServices.js";

export default {
  data: () => ({
    user:{},
      users: {},
      firstInitial: "",
      lastInitial: ""
    }),
    created() {
    this.user = Utils.getStore("user");
    UserServices.getUser(this.user.userID)
      .then((response) => {
        this.users = response.data;
        this.firstInitial = this.users.fName.charAt(0);
        this.lastInitial = this.users.lName.charAt(0);


      })

      .catch((error) => {
        console.log("Error Retrieving the user:", error.response);
      });
  },

  methods: {
          goToProfile() {
        this.user = Utils.getStore('user');
        let id = this.user.userID;
       if (this.user != null) {
       this.$router.push({ name: "userprofile", params: id});
       }
  },
   goToLogout() {
     console.log("here");
      if (this.user == null) {
        this.$router.push({ name: "login" }).catch((error) => {
          console.log(error);
        });
      } 
      else {
         Utils.setStore('user', null)
          this.$router.push({ name: 'login'})
      }
    },
  }
  }
</script>

<style scoped>

</style>

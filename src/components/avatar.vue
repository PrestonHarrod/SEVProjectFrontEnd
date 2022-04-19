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
              color="#FFFFFF"
              size="48"
            >
              <span color="#fffcff">{{ firstInitial }}{{lastInitial }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="#FFFFFF"
              >
                <span color="#fffcff">{{ firstInitial }}{{lastInitial }}</span>
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
              <v-divider v-if="this.exclusivelyStudent == true" class="my-3"></v-divider>
              <v-btn v-if="this.exclusivelyStudent == true"
               @click="goToBecomeTutor()"
                depressed
                rounded
                text
              >
                Become a Tutor
              </v-btn>
              <v-divider v-if="this.exclusivelyStudent == true" class="my-3"></v-divider>
              <v-btn v-if="this.exclusivelyStudent == true"
              @click="goToRequest()"
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
import userRoleServices from "@/services/userRoleServices.js";

export default {
  data: () => ({
    user:{},
      users: {},
      firstInitial: "",
      lastInitial: "",
      exclusivelyStudent: true,
    }),
    created() {
    this.user = Utils.getStore("user");
    UserServices.getUser(this.user.userID)
      .then((response) => {
        this.users = response.data;
        this.firstInitial = this.users.fName.charAt(0);
        this.lastInitial = this.users.lName.charAt(0);

        userRoleServices.getRolesFromUser(this.user.userID).then((response1) => {
          this.roles = response1.data;
          for (let i = 0; i < response1.data.length; i++) {
            console.log(this.roles[i].roleID + " roleID");
            if (this.roles[i].roleID == 2 || this.roles[i].roleID == 3) {
                this.exclusivelyStudent = false;
            }
          }
        })


      })

      .catch((error) => {
        console.log("Error Retrieving the user:", error.response);
      });
  },

  methods: {
    goToProfile() {

      this.user = Utils.getStore('user');
      //let id = this.user.userID;
      if (this.user != null) {
        this.$router.push({ name: "userprofile"});
      }
    },
    goToBecomeTutor() {
      this.user = Utils.getStore('user');
      //let id = this.user.userID;
      if (this.user != null) {
        this.$router.push({ name: "becometutor"});
      }

  },
  goToRequest() {
      console.log("HERE")
      if (this.user != null) {
        this.$router.push({name: "request"}).catch((error) => {
          console.log(error);
        });
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

<style>

</style>

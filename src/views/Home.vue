<template>
<v-app id="inspire">
<v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import Utils from "@/config/utils.js";
import UserServices from "@/services/UserServices.js"
// import StudentServices from '@/services/studentServices.js';
// import AdvisorServices from '@/services/advisorServices.js';
// import Nav from '@/components/Nav.vue'

export default {
  data() {
    return {
      //components: {Nav},
      user: {},
    };
  },
  async created() {
    this.user = Utils.getStore('user'); // get current logged in user

   // get user who logged into system from backend to see if they exist 
   // then route them to the home page
    if (this.user != null) {
        await UserServices.getUser(this.user.userID)
        .catch(() => {
            Utils.setStore("user", this.user);
            if (this.$route.path != '/home') {
                 this.$router.push({ name: "home" });
}
        })
      
    }
  },
};
</script>

<style></style>

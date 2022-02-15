<template>
  <v-container>
    <v-row>
      <v-col>
        <p>Welcome, {{ user.user }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Utils from "@/config/utils.js";
import UserServices from "@/services/userServices.js"

// import StudentServices from '@/services/studentServices.js';
// import AdvisorServices from '@/services/advisorServices.js';
import Nav from '@/components/Nav.vue'

export default {
  data() {
    return {
      components: {Nav},
      user: {},
    };
  },
  async created() {
    this.user = Utils.getStore("user");
    //console.log("advisorId="+this.user.advisorID+" studentId="+this.user.studentID)
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

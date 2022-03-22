<template>
  <div>
       <br>
    <H1 style="background-color: #1976d2; color: #f2f2f2">Profile</H1>
    <br />
    <v-form>
      <v-col>
        <v-text-field
          label="First Name"
          readonly
          v-model="users.fName"
          type="text"
          id="fName"
        />
        <v-text-field
          label="Last Name"
          readonly
          v-model="users.lName"
          type="text"
          id="lName"
        />   
        <v-text-field
          label="Phone Number"
          readonly
          v-model="users.phoneNumber"
          type="text"
          id="phoneNumber"
        />
      </v-col>
    </v-form>
  </div>
</template>

<script>
import UserServices from "@/services/UserServices.js";
import Utils from "@/config/utils.js";

export default {
  props: ["id"],
  data() {
    return {
      user: {},
      users: {},
    };
  },
  created() {
    this.user = Utils.getStore("user");
    UserServices.getUser(this.user.userID)
      .then((response) => {
        this.users = response.data;
      })

      .catch((error) => {
        console.log("Error Retrieving the user:", error.response);
      });
  },
  methods: {
   
  }
};
</script>

<style>
th {
  text-align: left;
  font-size: 1.5rem !important;
}
</style>

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
      <v-row>
      Contact Preference:
      <v-radio-group
     v-model="u.contactPref"
     v-on:change="changeContactPref"
      row
    >
      <v-radio
        label="Email"
        value="Email"
      ></v-radio>
      <v-radio
        label="Text"
        value="Text"
      ></v-radio>
    </v-radio-group>
      </v-row>
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
      u: {},
      user: {},
      users: {},
    };
  },
  created() {
    this.user = Utils.getStore("user");
    this.u.userID = this.user.userID;
    UserServices.getUser(this.user.userID)
      .then((response) => {
        this.users = response.data;
        if(this.users.contactPref != "Text")
          this.u.contactPref = "Email";
        else
          this.u.contactPref = "Text";
      })

      .catch((error) => {
        console.log("Error Retrieving the user:", error.response);
      });
  },
  methods: {
   changeContactPref() {
     UserServices.updateUser(this.u);
   }
  }
};
</script>

<style>
th {
  text-align: left;
  font-size: 1.5rem !important;
}
</style>

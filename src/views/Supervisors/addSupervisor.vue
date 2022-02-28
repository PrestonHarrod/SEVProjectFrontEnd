<template>
  <div>
    <H1 style="background-color: #1976d2; color: #f2f2f2"
      >Add New supervisor</H1
    >
    <v-form>
      <v-col>
        <!-- <v-text-field label="UserID" v-model="tutor.userID" type="text" id="userID"/> -->
        <v-text-field
          label="First Name"
          placeholder="John"
          v-model="supervisor.fName"
          type="text"
          id="fName"
        />
        <v-text-field
          label="Last Name"
          placeholder="Smith"
          v-model="supervisor.lName"
          type="text"
          id="lName"
        />
        <v-text-field
          label="Email"
          placeholder="john.smith@eagles.oc.edu"
          v-model="supervisor.email"
          type="text"
          id="email"
        />
        <v-text-field
          label="Phone Number"
          placeholder="405-555-5940"
          v-model="supervisor.phoneNumber"
          type="text"
          id="phoneNumber"
        />

        <v-radio-group v-model="supervisor.orgID" column>
          <v-radio label="Student Success" color="red" value="1"></v-radio>
          <v-radio label="Writing Center" color="red darken-3" value="2"></v-radio>
          <v-radio label="New College" color="indigo" value="3"></v-radio>
        </v-radio-group>
      </v-col>
      <v-btn
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
        v-on:click.prevent="addSupervisor()"
        text
        rounded
        >Submit</v-btn
      >
      <v-btn
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
        v-on:click.prevent="cancel()"
        color="black"
        text
        rounded
        >Cancel</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import UserServices from "@/services/UserServices.js";
import UserRoleServices from "@/services/userRoleServices.js";
import UserOrgServices from "@/services/userOrgServices.js";

export default {
  data() {
    return {
      supervisor: {},
    };
  },
  methods: {
    addSupervisor() {
      UserServices.addUser(this.supervisor)
        .then((response) => {
          this.$router.push({ name: "supervisors" });
          var id = response.data.userID;
          console.log("userID: " + id);
          let userRole = {
            userID: id,
            roleID: 2, //2 for supervisor
          };
          let userOrg = {
            userID: id,
            orgID: this.supervisor.orgID,
          }; //add the ibject for a userOrg

          UserRoleServices.addUserRole(userRole)
            .then(() => {})
            .catch((error) => {
              console.log(error);
            }); //post the userRole

          UserOrgServices.addUserOrg(userOrg)
            .then(() => {
              console.log("user org called...");
            })
            .catch((error) => {
              console.log(error);
            }); //post the userOrg
            
           
        })
        .catch((error) => {
          console.log(error);
          alert(
            "ERROR: Adding a supervisor unsuccessful. Make sure that the fields are entered correctly"
          );
        });
    },
    cancel() {
      this.$router.push({ name: "supervisors" });
    },
  },
};
</script>
<style></style>

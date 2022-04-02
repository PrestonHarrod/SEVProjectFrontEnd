<template>
  <div>
    <H1>Add New Student</H1>
    <v-form>
      <v-col>
        <!-- <v-text-field label="UserID" v-model="tutor.userID" type="text" id="userID"/> -->
        <v-text-field
          label="First Name"
          placeholder="John"
          v-model="student.fName"
          type="text"
          id="fName"
        />
        <v-text-field
          label="Last Name"
          placeholder="Smith"
          v-model="student.lName"
          type="text"
          id="lName"
        />
        <v-text-field
          label="Email"
          placeholder="john.smith@eagles.oc.edu"
          v-model="student.email"
          type="text"
          id="email"
        />
        <v-text-field
          label="Level"
          placeholder="1000"
          v-model="student.level"
          type="text"
          id="level"
        />
        <v-text-field
          label="Phone Numbers"
          placeholder="405-555-5940"
          v-model="student.phoneNumber"
          type="text"
          id="phoneNumber"
        />
        <v-radio-group v-model="student.orgID" column>
          <v-radio label="Student Success" color="red" value="1"></v-radio>
          <v-radio label="Writing Center" color="red darken-3" value="2"></v-radio>
          <v-radio label="New College" color="indigo" value="3"></v-radio>
        </v-radio-group>
      </v-col>
      <v-btn
      class='centered-btns'
        v-on:click.prevent="addStudent()"
        text
        rounded
        >Submit</v-btn
      >
      <v-btn
      class='centered-btns'
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
      student: {},
    };
  },
  methods: {
    addStudent() {
      UserServices.addUser(this.student)
        .then((response) => {
          var id = response.data.userID;
          console.log("userID: " + id);
          let userRole = {
            userID: id,
            roleID: 4, //4 for student
          };
          let userOrg = {
            userID: id,
            orgID: this.student.orgID,
          }; //add the ibject for a userOrg

          UserRoleServices.addUserRole(userRole)
            .then(() => {})
            .catch((error) => {
              console.log(error);
            }); //post the user
            
            UserOrgServices.addUserOrg(userOrg)
            .then(() => {
              console.log("user org called...");
            })
            .catch((error) => {
              console.log(error);
            }); //post the userOrg

          this.$router.push({ name: "students" });
        })
        .catch((error) => {
          console.log(error);
          alert(
            "ERROR: Adding a student unsuccessful. Make sure that the fields are entered correctly"
          );
        });

    },
    cancel() {
      this.$router.push({ name: "students" });
    },
  },
};
</script>
<style></style>

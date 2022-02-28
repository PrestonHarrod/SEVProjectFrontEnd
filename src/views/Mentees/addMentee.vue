<template>
  <div>
    <H1 style="background-color: #1976d2; color: #f2f2f2">Add New Mentee</H1>
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
          label="Phone Number"
          placeholder="405-555-5055"
          v-model="student.phoneNumber"
          type="text"
          id="phoneNumber"
        />
      </v-col>
      <v-btn
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
        v-on:click.prevent="addStudent()"
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
            roleID: 5, //5 for mentees
          };
          UserRoleServices.addUserRole(userRole)
            .then(() => {})
            .catch((error) => {
              console.log(error);
            }); //post the user
           
           let userOrg = {
            userID: id,
            orgID: 1, //since only mentees are from student success
          }; //add the ibject for a userOrg
          UserOrgServices.addUserOrg(userOrg)
            .then(() => {
              console.log("user org called...");
            })
            .catch((error) => {
              console.log(error);
            }); //post the userOrg
          this.$router.push({ name: "mentees" });
        })
        .catch((error) => {
          console.log(error);
          alert(
            "ERROR: Adding a student unsuccessful. Make sure that the fields are entered correctly"
          );
        });
    },
    cancel() {
      this.$router.push({ name: "mentees" });
    },
  },
};
</script>
<style></style>

<template>
  <div>
    <H1>Student Edit</H1>
    <v-app>
      <v-form>
        <v-col>
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
            placeholder="405-555-5943"
            v-model="student.phoneNumber"
            type="text"
            id="phoneNumber"
          />
          <v-radio-group v-model="student.orgID" column>
          <v-radio label="Student Success" color="red" value="1"></v-radio>
          <v-radio
            label="Writing Center"
            color="red darken-3"
            value="2"
          ></v-radio>
          <v-radio label="New College" color="indigo" value="3"></v-radio>
        </v-radio-group>
        </v-col>
        <v-btn
        class='centered-btns'
          v-on:click.prevent="updateStudent()"
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
    </v-app>
  </div>
</template>
<script>
import UserServices from "@/services/UserServices.js";
import Utils from "@/config/utils.js";
import UserOrgServices from "@/services/userOrgServices.js";
export default {
  props: ["id"],
  components: {},
  data() {
    return {
      user: {},
      student: {},
      menu: false,
    };
  },
  created() {
    this.user = Utils.getStore("user");
    UserServices.getUser(this.id)
      .then((response) => {
        this.student = response.data;
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    cancel() {
      this.$router.push({ name: "viewStudent" });
    },
    updateStudent() {
      this.student.userID = this.id;
      console.log("this is the line of code's student: " + this.student);
      UserServices.updateUser(this.student)
        .then((response) => {
          this.$router.push({ name: "viewStudent" });
          var id = response.data.userID;
          let userOrg = {
            userID: id,
            orgID: this.student.orgID,
          }; //add  for a userOrg

          UserOrgServices.updateUserOrg(userOrg)
            .then(() => {
              console.log("user org update called...");
            })
            .catch((error) => {
              console.log(error);
            }); //post the userOrg
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
          alert(
            "ERROR:Edit student unsuccessful. Make sure that fields are entered correctly and that the Advisor ID and Degree ID exists in the system."
          );
        });
    },
  },
};
</script>

<style></style>

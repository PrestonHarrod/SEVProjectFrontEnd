<template>
  <div>
    <H1 style="background-color: #1976d2; color: #f2f2f2">Tutor Edit</H1>
    <v-app>
      <v-form>
        <v-col>
          <v-text-field
            label="First Name"
            placeholder="John"
            v-model="tutor.fName"
            type="text"
            id="fName"
          />
          <v-text-field
            label="Last Name"
            placeholder="Smith"
            v-model="tutor.lName"
            type="text"
            id="lName"
          />
          <v-text-field
            label="Email"
            placeholder="john.smith@eagles.oc.edu"
            v-model="tutor.email"
            type="text"
            id="email"
          />
          <v-text-field
            label="Level"
            placeholder="1000"
            v-model="tutor.level"
            type="text"
            id="level"
          />
          <v-text-field
            label="Phone Number"
            placeholder="405-555-5943"
            v-model="tutor.phoneNumber"
            type="text"
            id="phoneNumber"
          />

          <v-radio-group v-model="tutor.orgID" column>
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
          :style="{ transform: 'translateX(-50%)' }"
          v-on:click.prevent="updateTutor()"
          text
          rounded
          >Submit</v-btn
        >
        <v-btn
          :style="{ transform: 'translateX(-50%)' }"
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
      tutor: {},
      menu: false,
    };
  },
  created() {
    this.user = Utils.getStore("user");
    UserServices.getUser(this.id)
      .then((response) => {
        this.tutor = response.data;
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    cancel() {
      this.$router.push({ name: "viewTutor" });
    },
    updateTutor() {
      this.tutor.userID = this.id;

      UserServices.updateUser(this.tutor)
        .then((response) => {
          this.$router.push({ name: "viewTutor" });
          var id = response.data.userID;
          let userOrg = {
            userID: id,
            orgID: this.tutor.orgID,
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
          alert("ERROR:Edit Tutor unsuccessful.");
        });
    },
  },
};
</script>

<style></style>

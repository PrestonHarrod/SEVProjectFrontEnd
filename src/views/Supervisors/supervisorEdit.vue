<template>
  <div>
    <H1 style="background-color: #1976d2; color: #f2f2f2">Supervisor Edit</H1>
    <v-app>
      <v-form>
        <v-col>
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
          
          <v-radio-group v-model="supervisor.orgID" column>
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
          v-on:click.prevent="updateSupervisor()"
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
import UserOrgServices from "@/services/userOrgServices.js";
import Utils from "@/config/utils.js";
export default {
  props: ["id"],
  components: {},
  data() {
    return {
      user: {},
      supervisor: {},
      menu: false,
    };
  },
  created() {
    this.user = Utils.getStore("user");
    UserServices.getUser(this.id)
      .then((response) => {
        this.supervisor = response.data;
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    cancel() {
      this.$router.push({ name: "viewSupervisor" });
    },
    updateSupervisor() {
      this.supervisor.userID = this.id;
      console.log("this is the line of code's supervisor: " + this.supervisor);
      UserServices.updateUser(this.supervisor)
        .then((response) => {
          this.$router.push({ name: "viewSupervisor" });
            var id = response.data.userID;
            let userOrg = {
            userID: id,
            orgID: this.supervisor.orgID,
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
            "ERROR:Edit supervisor unsuccessful. Make sure that fields are entered correctly and that the Advisor ID and Degree ID exists in the system."
          );
        });

    },
  },
};
</script>

<style></style>

<template>
  <div>
    <br />
    <H1>Profile</H1>
    <br />
    <v-form>
      <v-col>
        <v-text-field
          label="First Name"
          v-model="u.fName"
          type="text"
          id="fName"
        />
        <v-text-field
          label="Last Name"
          v-model="u.lName"
          type="text"
          id="lName"
        />
        <v-text-field
          label="Phone Number"
          v-model="u.phoneNumber"
          type="text"
          id="phoneNumber"
        />
      </v-col>
      <v-row>
        <div style="margin-left: 15px">
          <v-radio-group
            v-model="u.contactPref"
            v-on:change="changeContactPref"
            row
          >
            Contact Preference:
            <v-radio label="Email" value="Email"></v-radio>
            <v-radio label="Text" value="Text"></v-radio>
          </v-radio-group>
        </div>
      </v-row>
      <v-row>
      <div class="float-child">
        <h3>Organizations:</h3>
        <ul>
          <li v-for="org in orgs" :key="org.id">
            <input
              type="checkbox"
              :id="'checkbox2' + org.id"
              :value="org"
              v-model="selectedOrgs"
            />
            <label :for="org.title">{{ org.title }}</label>
          </li> 
        </ul>
      </div>
      </v-row>
      <v-row>
        <div>
       <v-btn
          :style="{ transform: 'translateX(600%)' }"
          v-on:click.prevent="updateUser()"
          text
          rounded
          >Submit</v-btn
        >
        </div>
      </v-row>
    </v-form>
    
  </div>
</template>

<script>
import UserServices from "@/services/UserServices.js";
import UserOrgServices from "@/services/userOrgServices.js";
import Utils from "@/config/utils.js";

export default {
  props: ["id"],
  data() {
    return {
      u: {},
      user: {},
      orgs: [
        { title: "Student Success Center", id: 1 },
        { title: "Writing Center", id: 2 },
        { title: "New College", id: 3 },
      ],
      selectedOrgs: [],
      checkedOrgs: [],
    };
  },
  created() {
    this.user = Utils.getStore("user");
    UserServices.getUser(this.user.userID)
      .then((response) => {
        this.u = response.data;
        if (this.u.contactPref != "Text") this.u.contactPref = "Email";
        else this.u.contactPref = "Text";
      })

      .catch((error) => {
        console.log("Error Retrieving the user:", error.response);
      });

      UserOrgServices.getUsersOrgID(this.user.userID)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
        this.checkedOrgs[i] = response.data[i];
        var input = document.getElementById("checkbox2" + this.checkedOrgs[i].orgID);
        this.selectedOrgs.push(this.orgs[this.checkedOrgs[i].orgID]);
        }
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    changeContactPref() {
      UserServices.updateUser(this.u);
    },
    updateUser() {
      //delete all the userOrgs with id = userId
      UserOrgServices.deleteUserOrg(this.user.userID)
        .then(() => {
          console.log(
            "called to delete all the userOrgs for user: " + this.user.userID
          );
        })

        .catch((error) => {
          console.log(error);
        });
      let os = "";
      //Then add like this
      for (let i = 0; i < this.selectedOrgs.length; i++) {
        if(this.selectedOrgs[i].id != null) {
        os = os + "," + this.selectedOrgs[i].id;
        let userOrg = {
          userID: this.user.userID,
          orgID: this.selectedOrgs[i].id,
        };
        UserOrgServices.addUserOrg(userOrg)
          .then(() => {
            console.log("user org called...");
          })
          
        }
      }
      this.user.orgs = os;
      Utils.setStore("user", this.user);
      if(!os.includes(Utils.getStore("currentOrg"))) {
        Utils.setStore("currentOrg", this.selectedOrgs[0].id);
      }
      //finally, update the main components of the student
      UserServices.updateUser(this.u)
        .then(() => {
          //  this.$router.push({ name: "home" });
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
          alert("ERROR:Edit Tutor unsuccessful.");
        });
    },
  },
};
</script>

<style>
</style>

<template>
  <div>
    <H1>Tutor Edit</H1>
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
          <!-- parent -->
          <div class="float-container">
            <!-- first -->
            <div class="float-child">
              <div>
                <h3>Roles:</h3>
                <ul>
                  <li v-for="role in roles" :key="role.id">
                    <input
                      type="checkbox"
                      :id="'checkbox' + role.id"
                      :value="role"
                      v-model="selectedRoles"
                    />
                    <label :for="role.name">{{ role.name }}</label>
                  </li>
                </ul>
              </div>
            </div>

            <!-- second -->
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
          </div>
        </v-col>
      </v-form>
    </v-app>
  </div>
</template>
<script>
import UserServices from "@/services/UserServices.js";
import Utils from "@/config/utils.js";
import UserOrgServices from "@/services/userOrgServices.js";
import UserRoleServices from "@/services/userRoleServices.js";
export default {
  props: ["id"],
  components: {},
  data() {
    return {
      user: {},
      tutor: {},
      checkedRoles: [],
      checkedOrgs: [],
      menu: false,
      orgs: [
        { title: "Student Success Center", id: "1" },
        { title: "Writing Center", id: 2 },
        { title: "New College", id: 3 },
      ],
      selectedOrgs: [],
      roles: [
        { name: "Admin", id: 1 },
        { name: "Supervisor", id: 2 },
        { name: "Tutor", id: 3 },
        { name: "Student", id: 4 },
        { name: "Mentee", id: 5 },
      ],
      selectedRoles: [],
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
    //grab each role that the tutor has and loop through the checkboxes and check the ones in the system
    console.log("user's ID " + this.id);
    UserRoleServices.getRolesFromUser(this.id)
      .then((response) => {
        console.log(response.data.length + "number of roles");
        for (let i = 0; i < response.data.length; i++) {
          this.checkedRoles[i] = response.data[i];
          var input = document.getElementById(
            "checkbox" + this.checkedRoles[i].roleID
          );
          input.checked = true;
          console.log("im in the created loop");
          // let num = this.checkedRoles[i];
          // this.$refs.num.checked = true;
        }
      })
      .catch((error) => {
        console.log("There was an error:", error);
      });
    //loop through the checkedroles and mark the checkboxes as checked

    //loop through each of the orgs and check the boxes for the orgs returned
    UserOrgServices.getUsersOrgID(this.id)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.checkedOrgs[i] = response.data[i];
          var input = document.getElementById(
            "checkbox2" + this.checkedOrgs[i].orgID
          );
          input.checked = true;
        }
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
    //loop through all the orgs and check the org
  },
  methods: {
    cancel() {
      this.$router.push({ name: "viewTutor" });
    },
    updateTutor() {
      this.tutor.userID = this.id;

      //delete all the tutor's userRoles with their ID = userID
      UserRoleServices.deleteUserRole(this.tutor.userID)
        .then(() => {
          console.log(
            "called to delete all the userRoles for user: " + this.tutor.userID
          );
        })

        .catch((error) => {
          console.log(error);
        });

      //then add them all back like this
      for (let i = 0; i < this.selectedRoles.length; i++) {
        let userRole = {
          userID: this.tutor.userID,
          roleID: this.selectedRoles[i].id,
        };
        UserRoleServices.addUserRole(userRole)
          .then(() => {
            console.log("user role called...");
          })
          .catch((error) => {
            console.log(error);
          });
      }

      //delete all the userOrgs with id = userId
      UserOrgServices.deleteUserOrg(this.tutor.userID)
        .then(() => {
          console.log(
            "called to delete all the userOrgs for user: " + this.tutor.userID
          );
        })

        .catch((error) => {
          console.log(error);
        });

      //Then add like this
      for (let i = 0; i < this.selectedOrgs.length; i++) {
        let userOrg = {
          userID: this.tutor.userID,
          orgID: this.selectedOrgs[i].id,
        };
        UserOrgServices.addUserOrg(userOrg)
          .then(() => {
            console.log("user org called...");
          })
          .catch((error) => {
            console.log(error);
          });
      }

      //finally, update the main components of the tutor
      UserServices.updateUser(this.tutor)
        .then(() => {
          this.$router.push({ name: "viewTutor" });
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
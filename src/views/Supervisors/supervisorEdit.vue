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
          <v-text-field
            label="Phone Number"
            placeholder="405-555-5493"
            v-model="supervisor.phoneNumber"
            type="text"
            id="phoneNumber"
          />

          <div class="wrap">
            <div class="left">
              <h3>Roles:</h3>
              <ul>
                <li v-for="role in roles" :key="role.id">
                  <input
                    type="checkbox"
                    :id="role.id"
                    :value="role"
                    v-model="selectedRoles"
                  />
                  <label :for="role.name">{{ role.name }}</label>
                </li>
              </ul>
            </div>

            <div class="right">
              <div v-for="role in selectedRoles" :key="role.id">
                {{ role.name }}
              </div>
            </div>
          </div>

          <div class="wrap">
            <div class="left">
              <h3>Organizations:</h3>
              <ul>
                <li v-for="org in orgs" :key="org.id">
                  <input
                    type="checkbox"
                    :id="org.id"
                    :value="org"
                    v-model="selectedOrgs"
                  />
                  <label :for="org.title">{{ org.title }}</label>
                </li>
              </ul>
            </div>

            <div class="right">
              <p v-for="org in selectedOrgs" :key="org.id">{{ org.title }}</p>
            </div>
          </div>
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
import UserRoleServices from "@/services/userRoleServices.js";
import Utils from "@/config/utils.js";
export default {
  props: ["id"],
  components: {},
  data() {
    return {
      user: {},
      supervisor: {},
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

      for (let i = 0; i < this.selectedRoles.length; i++) {
        let userRole = {
          userID: this.supervisor.userID,
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

      //update the orgs

      for (let i = 0; i < this.selectedOrgs.length; i++) {
        let userOrg = {
          userID: this.supervisor.userID,
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

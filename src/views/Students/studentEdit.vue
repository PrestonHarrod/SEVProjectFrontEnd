<template>
  <div>
    <H1 style="background-color: #1976d2; color: #f2f2f2">Student Edit</H1>
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

          <div class="wrap">
            <div class="left">
              <h3>Roles:</h3>
              <ul>
                <li v-for="role in roles" :key="role.id">
                  <input
                    type="checkbox"
                    :id="role.id"
                    :value="role.name"
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
                    :id="org.title"
                    :value="org.title"
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
          v-on:click.prevent="updateStudent()"
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
import UserRoleServices from "@/services/userRoleServices.js";
export default {
  props: ["id"],
  components: {},
  data() {
    return {
      user: {},
      student: {},
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
        .then(() => {
          this.$router.push({ name: "viewStudent" });
          // var id = response.data.userID;

          // UserOrgServices.updateUserOrg(userOrg)
          //   .then(() => {
          //     console.log("user org update called...");
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   }); //post the userOrg
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
          alert(
            "ERROR:Edit student unsuccessful. Make sure that fields are entered correctly and that the Advisor ID and Degree ID exists in the system."
          );
        });
    },
    addUserOrg() {
      //define the userRole
      UserRoleServices.addUserRole(userRole)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        }); //post the user

      
    },
    deleteUserOrg() {
      //deletes a single userOrg Entry when the checkbox is checked
    },
    addUserRole() {
     //define userOrg
     UserOrgServices.addUserOrg(userOrg)
        .then(() => {
          console.log("user org called...");
        })
        .catch((error) => {
          console.log(error);
        }); //post the userOrg
    },
    deleteUserRole() {
      //deletes a single userRole Entry when the checkbox is checked
    },
  },
};
</script>

<style>
#app {
  max-width: 800px;
  margin: auto;
}

code {
  background: #f2f2f2;
  padding: 0 0.5rem;
}

.mainBody {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin: 1rem 0;
  padding: 1rem 0;
}

.wrap {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.left,
.right {
  flex: 1;
}

ul {
  text-align: center;
  list-style: inside;
}
</style>

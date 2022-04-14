<template>
  <div>
    <H1>Add New User</H1>
    <p>Welcome to our site! please enter in your info and then login!</p>
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
        <!-- parent -->
        <div class="float-container">
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
      <v-btn
        class="centered-btns"
        v-on:click.prevent="addStudent()"
        text
        rounded
        >Submit</v-btn
      >
      <v-btn
        class="centered-btns"
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
      orgs: [
        { title: "Student Success Center", id: "1" },
        { title: "Writing Center", id: 2 },
        { title: "New College", id: 3 },
      ],
      selectedOrgs: [],
    };
  },
  methods: {
    async addStudent() {
      var canAdd = 0;

      //Make crud call to find the user with the email
      await UserServices.getUserByEmail(this.student.email).then((response) => {
        if (response.data.length == 0) {
          canAdd = 1;
          console.log(canAdd);
        }
      });

      //if the user is found, do not add the user. if not, add the user
      if (canAdd) {
        UserServices.addUser(this.student)
          .then((response) => {
            var id = response.data.userID;
            console.log("userID: " + id);
            let userRole = {
              userID: id,
              roleID: 4, //4 for student
            };
            UserRoleServices.addUserRole(userRole)
              .then(() => {})
              .catch((error) => {
                console.log(error);
              }); //post the user

            //adding all the userOrgs
            for (let i = 0; i < this.selectedOrgs.length; i++) {
              let userOrg = {
                userID: id,
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

            alert("User Added Successfully");
            this.$router.push({ name: "login" });
          })
          .catch((error) => {
            console.log(error);
            alert(
              "ERROR: Adding a student unsuccessful. Make sure that the fields are entered correctly"
            );
          });
      } else {
        alert("User is already registered");
      }
    },
    cancel() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style></style>
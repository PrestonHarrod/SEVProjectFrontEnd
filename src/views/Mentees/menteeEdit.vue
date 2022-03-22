<template>
  <div>
    <H1 style="background-color: #1976d2; color: #f2f2f2">Mentee Edit</H1>
    <v-app>
      <v-form>
        <v-col>
          <v-text-field
            label="First Name"
            placeholder="John"
            v-model="mentee.fName"
            type="text"
            id="fName"
          />
          <v-text-field
            label="Last Name"
            placeholder="Smith"
            v-model="mentee.lName"
            type="text"
            id="lName"
          />
          <v-text-field
            label="Email"
            placeholder="john.smith@eagles.oc.edu"
            v-model="mentee.email"
            type="text"
            id="email"
          />
          <v-text-field
            label="Level"
            placeholder="1000"
            v-model="mentee.level"
            type="text"
            id="level"
          />
          <v-text-field
          label="Phone Number"
          placeholder="405-555-5055"
          v-model="mentee.phoneNumber"
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

        </v-col>
        <v-btn
          :style="{ transform: 'translateX(-50%)' }"
          v-on:click.prevent="updateMentee()"
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
import UserRoleServices from "@/services/userRoleServices.js";
import Utils from "@/config/utils.js";
export default {
  props: ["id"],
  components: {},
  data() {
    return {
      user: {},
      mentee: {},
      menu: false,
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
        this.mentee = response.data;
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    cancel() {
      this.$router.push({ name: "viewMentee" });
    },
    updateMentee() {
      this.mentee.userID = this.id;

           for (let i = 0; i < this.selectedRoles.length; i++) {
        let userRole = {
          userID: this.student.userID,
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


      UserServices.updateUser(this.mentee)
        .then(() => {
          this.$router.push({ name: "viewMentee" });
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
          alert("ERROR:Edit Mentee unsuccessful.");
        });
    },
  },
};
</script>

<style></style>

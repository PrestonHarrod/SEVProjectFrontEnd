<template>
  <div>
    <H1 style="background-color: #811429; color: #f2f2f2">Add New Tutor</H1>
    <v-form>
      <v-col>
        <!-- <v-text-field label="UserID" v-model="tutor.userID" type="text" id="userID"/> -->
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
      </v-col>
      <v-btn
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
        v-on:click.prevent="addTutor()"
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
export default {
  data() {
    return {
      tutor: {},
    };
  },
  methods: {
    addTutor() {
      console.log(this.tutor);
      UserServices.addUser(this.tutor)
        .then((response) => {
          var id = response.data.userID;
          console.log("userID: " + id);
          let userRole = {
            userID: id,
            roleID: 3, //3 for a tutor
          };
          UserRoleServices.addUserRole(userRole)
            .then(() => {
              console.log("inside the post for a userRole");
            })
            .catch((error) => {
              console.log(error);
            }); //post the user
          this.$router.push({ name: "tutors" });
        })
        .catch((error) => {
          console.log(error);
          alert(
            "ERROR: Adding tutor unsuccessful. Make sure that the fields are entered correctly"
          );
        });
    },
    cancel() {
      this.$router.push({ name: "tutors" });
    },
  },
};
</script>
<style></style>

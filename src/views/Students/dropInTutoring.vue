<template>
  <div>
    <H1 style="background-color: #1976d2; color: #f2f2f2">Drop In Tutoring</H1>
    <v-form>
      <v-col>
        <!-- <v-text-field label="UserID" v-model="tutor.userID" type="text" id="userID"/> -->
        <v-text-field
          label="First Name"
          placeholder="John"
          v-model="dropIn.fname"
          type="text"
          id="fname"
        />
        <v-text-field
          label="Last Name"
          placeholder="Smith"
          v-model="dropIn.lname"
          type="text"
          id="lname"
        />
        <v-text-field
          label="Today's Date"
          placeholder="1/1/2020"
          v-model="dropIn.date"
          type="text"
          id="date"
        />
        <v-text-field
          label="Email"
          placeholder="john.smith@eagles.oc.edu"
          v-model="dropIn.email"
          type="text"
          id="email"
        />
        <v-text-field
          label="Student ID #"
          placeholder="1234567"
          v-model="dropIn.studentIDNum"
          type="text"
          id="studentIDNum"
        />
        <v-text-field
          label="Subject Needing Help"
          placeholder="Math functions and modelling"
          v-model="dropIn.subject"
          type="text"
          id="level"
        />
      </v-col>
      <v-btn
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
        v-on:click.prevent="addDropIn()"
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
import DropInServices from "@/services/dropInServices.js";
//import the Drop In Services 

export default {
  data() {
    return {
      dropIn: {},
    };
  },
  methods: {
    addDropIn() {
      DropInServices.addDropIn(this.dropIn)
        .then(() => {
        this.dropIn = {}; //reset the fields
        //may want to replace this later in the UI fix
        alert(
            "Thank you for checking in!"
          ); 
       
        })
        .catch((error) => {
          console.log(error);
          alert(
            "ERROR: Adding Drop In sheet unsuccessful. Make sure that the fields are entered correctly"
          );
        });

    },
    cancel() {
      this.$router.push({ name: "/" });
    },
  },
};
</script>
<style></style>

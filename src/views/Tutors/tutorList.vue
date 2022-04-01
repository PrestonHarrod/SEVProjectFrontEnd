<template>
  <v-container>
    <div>
      <H1>Tutors</H1>
         <v-btn
         class='centered-btns'
          @click="goToAdd()"
          color="black"
          text
          rounded
          >Add Tutor</v-btn
        >
      <br />
      <v-card width="100vw">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search by First or Last Name"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-model="selected"
          show-select
          single-select
          :headers="headers"
          :items="tutors"
          item-key="email"
          :items-per-page="25"
          :search="search"
          @click:row="viewTutor"
        >
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import Utils from "@/config/utils.js";
import UserServices from "@/services/UserServices.js";

export default {
  components: {},
  data() {
    return {
      selected: [],
      tutor: {},
      search: "",
      headers: [
        {
          text: "First Name",
          align: "start",
          filterable: true,
          value: "fName",
        },
        {
          text: "Last Name",
          align: "start",
          filterable: true,
          value: "lName",
        },
        {
          text: "Email",
          align: "start",
          filterable: false,
          value: "email",
        },
        {
          text: "Phone Number",
          align: "start",
          filterable: false,
          value: "phoneNumber",
        },
      ],
      tutors: [{}],
    };
  },
  created() {
    this.user = Utils.getStore("user");
    var currentOrg = Utils.getStore("currentOrg");
    UserServices.getUsersByRole("3", currentOrg)
      .then((response) => {
        this.tutors = response.data;
      })

      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    goToAdd() {
      this.$router
        .push({ name: "addTutor" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    viewTutor(tutor) {
      let id = tutor.userID;
      console.log("TutorList id before passing: " + id);
      this.$router
        .push({ name: "viewTutor", params: { id: id } })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>

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
import SessionServices from "@/services/sessionServices.js"

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
        {
          text: "Avg Rating",
          align: "start",
          filterable: false,
          value: "rating",
        },
      ],
      tutors: [{}],
      rating: 0,
      i: 0,
      j: 0,
      sessionCount: 0,
      avgRating: 0,
      sessions: [],
    };
  },
  created() {
    this.user = Utils.getStore("user");
    var currentOrg = Utils.getStore("currentOrg");
    SessionServices.getSessions()
      .then(response => {
        this.sessions = response.data;
        UserServices.getUsersByRole("3", currentOrg)
      .then((response) => {
        this.tutors = response.data;
        for (this.j = 0; this.j < this.tutors.length; this.j++) {
          this.sessionCount = 0;
          this.avgRating = 0;
        
        for (this.i = 0; this.i < this.sessions.length; this.i++) {
          console.log(this.sessions[this.i].rating)
          if (this.sessions[this.i].rating != null) {
          if (this.sessions[this.i].tutorID == this.tutors[this.j].userID) {
            this.sessionCount++;
            console.log("HERE")
            this.avgRating += parseInt(this.sessions[this.i].rating);
            
          }
          }
        }
        // avgRating = avgRating / sessionCount;
        this.avgRating = this.avgRating / this.sessionCount;
        this.tutors[this.j].rating = this.avgRating.toString()
        console.log(this.tutors)
        
        }
        
      })
        
        
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

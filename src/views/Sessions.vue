<template>
  <v-container fluid fill-height>
    <div>
      <H1 style="background-color: #1976d2; color: #f2f2f2">Your Sessions</H1>
      <br />
      <br />
      <br />

      <h2 style="background-color: #1976d2; color: #f2f2f2">
        Upcoming Sessions
      </h2>
      <v-card width="100vw">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search by Session Date"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="sessions2"
          item-key="sessionID"
          :items-per-page="25"
          :single-select="singleSelect"
          show-select
          :search="search"
          @click:row="viewCourse"
          class="elevation-1"
        >
        </v-data-table>
      </v-card>
      <br />
      <h2 style="background-color: #1976d2; color: #f2f2f2">
        Completed Sessions
      </h2>
      <v-card width="100vw">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search by Session Date"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="sessions"
          item-key="sessionID"
          :items-per-page="25"
          :single-select="singleSelect"
          show-select
          :search="search"
          @click:row="viewCourse"
          class="elevation-1"
        >
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import Utils from "@/config/utils.js";
import UserServices from "@/services/UserServices.js";
import SessionServices from "@/services/sessionServices.js";
// import Nav from '@/components/Nav.vue'

export default {
  data() {
    return {
      selected: [],
      //studentCourseList: {},
      user: {},
      singleSelect: true,
      search: "",
      headers: [
        {
          text: "Date&Time",
          align: "start",
          filterable: true,
          //sortable: false,
          value: "scheduledStart",
        },
        {
          text: "Location",
          align: "start",
          filterable: true,
          value: "locationID",
        },
        {
          text: "Tutor",
          align: "start",
          filterable: false,
          value: "tutorID",
        },
      ],
      allSessions: [{}],
      upcomingSessions: [{}],
      completedSessions: [{}],
      sessions: [{}],
      sessions2: [{}],
      testArray: [{}],
      i: 0,
      j: 0,
      tutor: "tutorName",
    };
  },
  async created() {
    // display completed and upcoming sessions depending on
    // if a student or tutor is logged in
    this.user = Utils.getStore("user");
    SessionServices.getSessions()
      .then((response) => {
        this.i = 0;

        for (this.i = 0; this.i < response.data.length; this.i++) {
          if (this.user.userID == response.data[this.i].studentID) {
            if (response.data[this.i].status == "Upcoming") {
              this.upcomingSessions[this.i - 1] = response.data[this.i];
            }
            this.sessions[this.i] = response.data[this.i];
          }
        }
        for (this.i = 0; this.i < response.data.length; this.i++) {
          if (this.user.userID == response.data[this.i].studentID) {
            if (response.data[this.i].status == "Complete") {
              this.completedSessions[this.i] = response.data[this.i];
            }
            this.sessions[this.i] = response.data[this.i];
          }
        }

        this.sessions = this.completedSessions;
        this.sessions2 = this.upcomingSessions;

        console.log(this.sessions);
        console.log(this.sessions2);

        for (this.j = 0; this.j < this.sessions2.length; this.j++) {
          UserServices.getUser(this.sessions2[this.j].tutorID).then(
            (response) => {
              this.tutor = response.data.fName;
              console.log(this.sessions2[this.j - 1]);
              this.sessions2[this.j - 1].tutorID = this.tutor;
            }
          );
          //this.sessions[this.j].tutorID = tutor
        }
        for (this.j = 0; this.j < this.sessions.length; this.j++) {
          this.j = 0;
          UserServices.getUser(this.sessions[this.j].tutorID).then(
            (response) => {
              this.tutor = response.data.fName;
              console.log(this.sessions[this.j - 1]);
              this.sessions[this.j - 1].tutorID = this.tutor;
            }
          );
          //this.sessions[this.j].tutorID = tutor
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    viewCourse() {},
  },
};
</script>

<style>
H1 {
  text-align: center;
  font-size: 3.5rem !important;
}
th {
  text-align: left;
  font-size: 1.5rem !important;
}
</style>

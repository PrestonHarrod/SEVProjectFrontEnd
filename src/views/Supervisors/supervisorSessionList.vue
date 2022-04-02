<template>
  <v-container>
    <div>
      <H1>Organization's Sessions</H1>
      <br />
      <br />
      <br />

      <h2>
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
          @click:row="viewSession2"
          class="elevation-1"
        >
        
        </v-data-table>
         
      </v-card>
      <br />
      <h2>
        Completed Sessions
      </h2>
      <v-card width="100vw">
        <v-card-title>
          <v-text-field
            v-model="search2"
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
          @click:row="viewSession"
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
import LocationServices from "@/services/locationServices.js";
import userOrgServices from "@/services/userOrgServices.js";

// import Nav from '@/components/Nav.vue'

export default {
  data() {
    return {
      selected: [],
      //studentCourseList: {},
      user: {},
      singleSelect: true,
      search: "",
      search2: "",
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
      k: 0,
      l: 0,
      tutor: "",
      location: "",
      usersOrg: [{}],
      tutorsForOrg: {},
    };
  },
  async created() {
    // display completed and upcoming sessions depending on
    // if a student or tutor is logged in
    //get all users with roleID 3
    //take their userID's and find which ones belong to the supervisors same orgID
    //then look through all sessions with their userID's in tutorID slot.
    this.user = Utils.getStore("user");
    let id = this.user.userID;
    console.log(id + "users ID");

    await userOrgServices
      .getUsersOrgID(id).then((response) => { 
        this.usersOrg = response.data[0];
        this.usersOrgID = this.usersOrg.orgID;
        console.log(this.usersOrgID + "users org ID");
        UserServices.getUsersByRole("3", this.usersOrgID) .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
            this.tutorsForOrg[i] = response.data[i];
            SessionServices.getSessionsForTutor(this.tutorsForOrg[i].userID).then((response1) => {
        this.i = 0;
        for (this.i = 0; this.i < response1.data.length; this.i++) {
            if (response1.data[this.i].status === "Upcoming") {
              this.upcomingSessions[this.l] = response1.data[this.i];
              this.l++;
            }
         
          
        }
        this.i = 0;
        for (this.i = 0; this.i < response1.data.length; this.i++) {
            if (response1.data[this.i].status === "Complete") {
              this.completedSessions[this.k] = response1.data[this.i];
              this.k++;
            }
           
          
        }
if (JSON.stringify(this.upcomingSessions[0]) === "{}") {
  this.upcomingSessions.pop();
  this.sessions2 = this.upcomingSessions;
}
else {
this.sessions2 = this.upcomingSessions;
}
if (JSON.stringify(this.completedSessions[0]) === "{}") {
  this.completedSessions.pop();
  this.sessions = this.completedSessions;
}
else {
this.sessions = this.completedSessions;
}
        // Change location and user ID's to their corresponding 
        // actual names
        for (let j = 0; j < this.sessions2.length; j++) {
          UserServices.getUser(this.sessions2[j].tutorID).then(
            (response) => {
              this.tutor = response.data.fName + " " + response.data.lName;;
              this.sessions2[j].tutorID = this.tutor;
            },
          );
           LocationServices.getLocation(this.sessions2[j].locationID).then(
              (response) => {
                this.location = response.data.building + ": " + response.data.roomNum;
                this.sessions2[j].locationID = this.location;
              }
            )
        }
        for (let m = 0; m < this.sessions.length; m++) {
          UserServices.getUser(this.sessions[m].tutorID).then(
            (response) => {
              this.tutor = response.data.fName + " " + response.data.lName;
              // console.log(this.tutor);
              this.sessions[m].tutorID = this.tutor;
            }
          );
           LocationServices.getLocation(this.sessions[m].locationID).then(
              (response) => {
                this.location = response.data.building + ": " + response.data.roomNum;
                this.sessions[m].locationID = this.location;
              }
            )
        }
      })
            .catch((error) => {
        console.log(error);
      });
            }
        })





      })
    
  },

  methods: {
    viewSession(session) {
        let id = session.sessionID
          this.$router.push({ name: 'supervisorViewSession', params: {id: id}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
    },
    viewSession2(session2) {
        let id = session2.sessionID
          this.$router.push({ name: 'supervisorViewSession', params: {id: id}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
    },
  },
};
</script>

<style>
</style>

<template>
<v-container fluid fill-height>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Your Sessions</H1>
    <br>
    <br>
  <br>
  
    <h2 style="background-color: #811429; color:#f2f2f2">Upcoming Sessions</h2>
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
    <br>
    <h2 style="background-color: #811429; color:#f2f2f2">Completed Sessions</h2>
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
//import UserServices from "@/services/UserServices.js"
import SessionServices from "@/services/SessionServices.js"
// import Nav from '@/components/Nav.vue'

export default {
  data() {
    return {
          selected: [],
          //studentCourseList: {},
          user: {},
           singleSelect: true,
          search: '',
          headers: [
            {
            text: 'Date&Time',
            align: 'start',
            filterable: true,
            //sortable: false,
            value: 'scheduledStart',
            },
            {
            text: 'Location',
            align: 'start',
            filterable: true,
            value: 'locationID'
            },
            {
            text: 'Tutor',
            align: 'start',
            filterable: false,
            value: 'tutorID',
            },
          ],
          allSessions: [{}],
          upcomingSessions: [{}],
          completedSessions: [{}],
            sessions: [
              {
                
              }
            ],
            sessions2: [
              {
                
              }
            ],
            i: 0
           
        };
  },
  async created() {

    // display completed and upcoming sessions depending on
    // if a student or tutor is logged in
   this.user = Utils.getStore('user')
      SessionServices.getSessions()
      .then(response => {
        this.i = 0
        
        for (this.i = 0; this.i < response.data.length; this.i++) {
          if (this.user.userID == response.data[this.i].studentID)
          {
            console.log(response.data[this.i].status)
            if (response.data[this.i].status == "Complete") {
              
              this.completedSessions[this.i] = response.data[this.i];
            }
            this.sessions[this.i] = response.data[this.i];
          }
          else if (this.user.userID == response.data[this.i].tutorID)
          {
            if (response.data[this.i].status == "In Progress") {
              this.upcomingSessions[this.i] = response.data[this.i];
            }
          }
        }
        console.log(this.completedSessions)
        this.sessions = this.completedSessions
        this.sessions2 = this.upcomingSessions
      
      })
      .catch(error => {
        console.log(error)
      })
  
  },
  methods: { 
  viewCourse() {
    },
  }
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
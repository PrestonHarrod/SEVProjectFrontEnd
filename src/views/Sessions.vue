<template>
<v-container fluid fill-height>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Session List</H1>
    <br>
    <br>
     <h2><v-btn v-if='user.userID != null' :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Course</v-btn></h2>
  <br>
  
    
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
            sessions: [
              {
                
              }
            ],
           
        };
  },
  async created() {
   this.user = Utils.getStore('user')
       //UserServices.getUser(this.user.userID)
      SessionServices.getSessions()
      .then(response => {
        this.sessions = response.data
        console.log(this.sessions)
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
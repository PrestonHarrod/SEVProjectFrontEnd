<template>
<v-container fluid fill-height>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Session List</H1>
    <br>
    <br>
     <h2><v-btn v-if='user.userID != null' :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Course</v-btn></h2>
  <br>
  <h3><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToDegreePlan(user.userID)" color="black" text rounded>View Degree Plan</v-btn></h3>
  <br>
  <h4><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" @click="addToStudentCourseList(selected, user.userID)" color="black" text rounded>Register Course</v-btn></h4>
  
    
    <v-card width="100vw">
       <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search by Course Name or Number"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="courses"
        item-key="name"
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
import UserServices from "@/services/UserServices.js"
// import StudentServices from '@/services/studentServices.js';
// import AdvisorServices from '@/services/advisorServices.js';
// import Nav from '@/components/Nav.vue'

export default {
  data() {
    return {
          //selected: [],
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
            value: 'datetime',
            },
            {
            text: 'Location',
            align: 'start',
            filterable: true,
            value: 'location'
            },
            {
            text: 'Tutor',
            align: 'start',
            filterable: false,
            value: 'tutor',
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
       UserServices.getUser(this.user.userID)
      SessionServices.getSessions()
      .then(response => {
        this.sessions = response.data
       
      })
      .catch(error => {
        console.log(error)
      })
  
  }
};
</script>
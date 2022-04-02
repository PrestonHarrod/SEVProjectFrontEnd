<template>
  <div>
<H1>Session View</H1>
<br>
 <h2><v-btn class='centered-btns'  v-on:click.prevent="cancel()" color="black" text rounded>Go Back</v-btn></h2>
    <br>
  <v-form>
        <v-col>
            <v-text-field readonly label="Session ID" v-model="session.sessionID" type="text" id="sessionID"/>
            <v-text-field readonly label="Tutor" v-model="tutorName" type="text" id="tutor"/>
            <v-text-field readonly label="Student" v-model="studentName" type="text" id="student" />
            <v-text-field readonly label="Type" v-model="session.Type" type="text" id="Type"/>
            <v-text-field readonly label="URL" v-model="session.url" type="text" id="url"/>
            <v-text-field readonly label="Rating" v-model="session.rating" type="text" id="rating"/>
            <v-text-field readonly label="Status" v-model="session.status" type="text" id="status" />
            <v-text-field readonly label="Scheduled Start" v-model="start" type="text" id="scheduledStart" />
            <v-text-field readonly label="Scheduled End" v-model="end" type="text" id="scheduledEnd" />
       </v-col>
    </v-form>
  </div>
</template>

<script>
import sessionServices from '@/services/sessionServices.js'
import userServices from '@/services/UserServices.js'
import locationServices from '@/services/locationServices.js'
import TutorSlotServices from "@/services/tutorSlotServices.js"
import Utils from '@/config/utils.js'
export default {
    props: ['id'],
  data() {
    return {
    tutorSlot: {},
      user: {},
      session: {},
      tutor: {},
      tutorName: {},
      student: {},
      studentName: {},
      location: {},
      start: {},
      end: {},
    }
  },
  created() {
    this.user = Utils.getStore('user')
    console.log(this.id + "here again")
      sessionServices.getSession(this.id)
      .then(response => {
        this.session = response.data;
        let s = this.session.scheduledStart;
        let i = s.indexOf("T");
        console.log(s.substr(0, i));
        let d = new Date(s.substr(0, i));
        console.log(d.toDateString());
        this.start = s.substr(0, i) + " " + s.substr(i+1, 8);
        let e = this.session.scheduledEnd;
        i = e.indexOf("T");
        this.end = e.substr(0, i) + " " + e.substr(i+1, 8);
        userServices.getUser(response.data.tutorID)
        .then(response => {
            this.tutor = response.data;
            this.tutorName = response.data.fName + " " + response.data.lName;
        })

        userServices.getUser(response.data.studentID)
        .then(response => {
            this.student = response.data;
            this.studentName = response.data.fName + " " + response.data.lName;
        })

        locationServices.getLocation(response.data.locationID)
        .then(response => {
            this.location = response.data;
        })
      })
        
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'supervisorSessions' })
    },
    async deleteSession(session) {
      let id = session.sessionID;
      if (confirm("Do you really want to cancel this session?")) {
        TutorSlotServices.cancelSlot(session.tutorSlotID)
        .then((response) => {
            this.tutorSlot = response.data[0];
            this.tutorSlot.studentID = null;
            TutorSlotServices.updateTutorSlot(this.tutorSlot)
            .then(() => {
            sessionServices.deleteSession(id)
            })
        
          .then(() => {
            this.$router.push({ name: "studentSessions" });
          })

          .catch((error) => {
            console.log(error);
          });
         })
          .catch((error) => {
          console.log(error);
          });
        
      }
    },
    
}
}
</script>

<style>
</style> 
<template>
  <v-container>
    <div>
      <H1 style="background-color: #811429; color: #f2f2f2"
        >Schedule Session</H1
      >
      <br />
      <v-app>
        <v-form>
          
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
        <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
        <br />
        <v-calendar
          ref="calendar"
          v-model="value"
          :first-interval= 6
          :interval-count= 19
          :events="events"
          @click:event="viewSession"
          color="#811429"
          event-text-color="#811429"
          type="week"
        >
         
        </v-calendar>
        </v-form>
      </v-app>
    </div>
  </v-container>
</template>

<script>
import subjectServices from "@/services/subjectServices.js";
import UserServices from "@/services/UserServices.js";
import tutorSubjectServices from "@/services/tutorSubjectServices.js";
import SessionServices from "@/services/SessionServices.js";
//import Utils from "@/config/utils.js";
export default {
  data() {
    return {
      search: "",
      selected: [],
      subjects: [],
      subject: [],
      tutorSubjects: [{}],
      levels: ["Math", 2, 3, 4],
      level: "",
      headers: [
        {
          text: "First Name",
          align: "start",
          filterable: true,
          sortable: true,
          value: "fName",
        },
        {
          text: "Last Name",
          align: "start",
          filterable: true,
          sortable: true,
          value: "lName",
        },
        {
          text: "Subjects Tutored",
          align: "start",
          filterable: true,
          sortable: true,
          value: "tutorSubject.subject.name",
        },
      ],
      users: [{}],
      user: {},
    sessions: {},
    events: [],
    value: '',
    };
  },

  created() {
    subjectServices
      .getSubjects()
      .then((response) => {
        this.subjects = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    UserServices
      .getTutors("3")
      .then((response) => {
        this.users = response.data;
      })

      .catch((error) => {
        console.log(error);
      });
      SessionServices.getSessions()
      .then((response) => {
          response.data.forEach(session => 
          {
           console.log(session.studentID)
            UserServices.getUser(session.studentID) 
            .then((student) => {
                let s = session.scheduledStart;
                console.log(session)
                let i = s.indexOf("T");
                let st = s.substr(0, i) + " " + s.substr(i+1, 8);
                let e = session.scheduledEnd;
                i = e.indexOf("T");
                let end = e.substr(0, i) + " " + e.substr(i+1, 8);
                if(session.tutorID == this.user.userID)
                {
                  console.log(this.user.userID);  
                    this.events.push({id: session.sessionID, name: "Session: " + student.data.fName + " " + student.data.lName.substr(0,1), start: st, end: end})
                }
            })
            
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    findTutor(subjectID, level) {
      console.log(subjectID);
      console.log(level);

      
    },
     viewSession(event) {
        let start = event.eventParsed.start.date + " " + event.eventParsed.start.time + ":00";
        let end = event.eventParsed.end.date + " " + event.eventParsed.end.time + ":00";
        this.events.forEach(e => {
            if(e.start == start && e.end == end)
            {
                console.log(e.id);
                 this.$router.push({ name: 'sessionView', params: {id: e.id}})
                .then(() => {
                })
                .catch(error => {
                 console.log(error)
                })
            }
        })
       
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
    
    getTutorSubjectsForTutor(id) {
    tutorSubjectServices
      .getTutorSubjects(id)
      .then((response) => {
        this.tutorSubjects = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  },
};
</script>

<style  scoped>
</style>

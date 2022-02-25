<template>
  <v-container>
    <div>
      <H1 style="background-color: #811429; color: #f2f2f2"
        >Schedule Session</H1
      >
      <br />
      <v-app>
        <v-form>
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                v-model="subject"
                :items="subjects"
                label="Subject List"
                item-text="name"
                item-value="name"
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <!-- <h2><v-btn color="#66BB6A" @click="findTutor(subjects.subjectID, level)">Submit</v-btn></h2> -->
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div>
                <v-card width="100vw">
                  <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="users"
                    item-key="userID"
                    :items-per-page="25"
                    single-select
                    show-select 
                    :search="subject"
                    @input='getTutorSlots(selected)'
                    class="elevation-1"
                    
                  >
                  </v-data-table>
                </v-card>
              </div>
            </v-col>
          </v-row>
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
        <v-calendar v-if="selected[0] != null"
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
import TutorSlotServices from "@/services/tutorSlotServices.js"
import Utils from "@/config/utils.js";
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
      this.user = Utils.getStore("user");

  },

  methods: {
    findTutor(subjectID, level) {
      console.log(subjectID);
      console.log(level);

      
    },
    // Get and display tutor slots for selected tutor
    getTutorSlots(selected) {
      this.events = []
      console.log(selected[0].userID)
      TutorSlotServices.getTutorSlotForTutor(selected[0].userID)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          var d = new Date();
          var dayName = days[d.getDay()];

            // display tutor slots for current day
            if (response.data[i].day == dayName) {
              var date = new Date();
              console.log(date)
              var month = date.getUTCMonth() + 1; //months from 1-12
              if (month < 10) {
                month = "0" + month;
              }
              var day = date.getUTCDate();
              var year = date.getUTCFullYear();

              let newdate = year + "-" + month + "-" + day;
              let starttime = newdate + " " +response.data[i].startTime
              let endtime = newdate + " " +response.data[i].endTime
              
              this.events.push({id: response.data[i].tuturSlotID, name: "Open Slot ", start: starttime, end: endtime})
          }
          // display tutor slots for each day after current day
          for (let j = 0; j < 6; j++) {
            if (response.data[i].day == days[j])
            {
              console.log(response.data[i].day)
              console.log(days[j])
              var tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate()+j);
              var month2 = tomorrow.getUTCMonth() + 1; //months from 1-12
              if (month2 < 10) {
                month2 = "0" + month2;
              }
              var day2 = tomorrow.getUTCDate();
              var year2 = tomorrow.getUTCFullYear();

              let newdate2 = year2 + "-" + month2 + "-" + day2;
              let starttime2 = newdate2 + " " +response.data[i].startTime
              let endtime2 = newdate2 + " " +response.data[i].endTime
              
              this.events.push({id: response.data[i].tuturSlotID, name: "Open Slot ", start: starttime2, end: endtime2})
              

            }
          }
          //let d = response.data[i].day
          // let st = response.data[i].startTime
          // let et = response.data[i].endTime
          // this.events.push({id: response.data[i].tuturSlotID, name: "Session: " + response.data[i].studentID, start: st, end: et})
        }
        // let s = response.scheduledStart;
        //         let i = s.indexOf("T");
        //         let st = s.substr(0, i) + " " + s.substr(i+1, 8);
        //         let e = session.scheduledEnd;
        //         i = e.indexOf("T");
        //         let end = e.substr(0, i) + " " + e.substr(i+1, 8);
        //         if(session.tutorID == this.user.userID)
        //             this.events.push({id: session.sessionID, name: "Session: " + student.data.fName + " " + student.data.lName.substr(0,1), start: st, end: end})
      })
    },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
  },
};
</script>

<style  scoped>
</style>

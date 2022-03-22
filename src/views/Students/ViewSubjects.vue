<template>
  <v-container>
    <div>
      <H1 style="background-color: #1976d2; color: #f2f2f2"
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
            <v-col class="d-flex" cols="12" sm="6"> </v-col>
          </v-row>
          <v-row>
            <v-col>
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
                    @input="getTutorSlots(selected)"
                    class="elevation-1"
                    >
                  </v-data-table>
                </v-card>
              </div>
            </v-col>
          </v-row>
          <v-row>
          <v-btn v-if="selected[0] != null" fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn v-if="selected[0] != null" fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-col v-if="selected[0] != null">
            <H2 style="background-color: #1976d2; color: #f2f2f2">
            {{ month }}
          </H2>
          </v-col>
          </v-row>
          <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
          <br />
          <v-calendar
            v-if="selected[0] != null"
            ref="calendar"
            v-model="value"
            :first-interval="6"
            :interval-count="19"
            :events="events"
            @click:event="viewSession"
            :event-color="getEventColor"
            @change="getTutorSlots"
            color="blue"
            event-text-color="white"
            :event-ripple="false"
            type="week"

          >
          </v-calendar>
          <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              style="background-color: #1976d2; color: #f2f2f2"
            >
             
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="selectedEvent.name == 'Open Slot'"
                text
                color="primary"
                selectedOpen = true;
                @click="scheduleSession(selectedEvent, session, selected, selectedOpen)"
              >
                Book
              </v-btn>
              <v-btn v-if="selectedEvent.name == 'Group Session'"
                text
                color="primary"
                selectedOpen = true;
                @click="signUp(selectedEvent, session, selected, selectedOpen)"
              >
                Sign Up
              </v-btn>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        </v-form>
      </v-app>
    </div>
  </v-container>
</template>

<script>
import subjectServices from "@/services/subjectServices.js";
import TutorSlotServices from "@/services/tutorSlotServices.js"
import UserServices from "@/services/UserServices.js";
import userOrgServices from "@/services/userOrgServices.js";
import Utils from '@/config/utils.js';
import SessionServices from "@/services/sessionServices.js";


export default {
  data() {
    return {
      search: "",
      selected: [],
      subjects: [],
      subject: "",
      tutorSubjects: [{}],
      levels: ["Math", 2, 3, 4],
      level: "",
      value: "",
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      month: '',
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
      usersOrg: [{}],
      usersOrgID: 0,
      events: [],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      session: {},
      colors:['green', 'red'],
      tutorSlot: {},
      z: 0,

    };
  },


 async created() {
    this.user = Utils.getStore('user');
    let id = this.user.userID;
    let d = new Date();
    this.month = this.months[d.getMonth()];
      // function to get users org
    userOrgServices.getUsersOrgID(id)
    .then((response) => {
        this.usersOrg = response.data;
        for( let i = 0; i < response.data.length; i++) {
        this.usersOrgID = this.usersOrg[i].orgID;
         UserServices.getTutors("3", this.usersOrgID)
          .then((response) => {
            this.users = response.data;
            for (let i = 0; i < this.users.length; i++) {
              console.log(this.users)
              if (this.users[i].userID == this.user.userID) {
                this.users.splice(i, 1)
                console.log("HERE")
              }
      }
         })
          .catch((error) => {
          console.log(error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
      await subjectServices
      .getSubjects()
      .then((response) => {
        this.subjects = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
      
    this.user = Utils.getStore("user");
  },

  methods: {
    getEventColor (event) {
      if (event.name == "Group Session") {
         this.color = "blue";
       }
       else if (event.name == "Open Slot") {
         this.color = "green";
       }
       else if (event.name == "Booked"){
         this.color = "red";
       }

        return event.color;
      },
    scheduleSession(selectedEvent, session, selected, selectedOpen) {
      if (selectedEvent.name != "Booked") {
      if (confirm("Do you want to book this time slot?")) {
         this.user = Utils.getStore('user');
         this.session = session;
         this.session.studentID = this.user.userID;
         this.session.tutorID = selected[0].userID;
         this.session.scheduledStart = selectedEvent.start;
         this.session.scheduledEnd = selectedEvent.end;
         this.session.status = "Upcoming";
         this.session.locationID = "1";
         if (selectedEvent.name != "Group Session") {
         selectedEvent.name = "Booked";
         selectedEvent.color = "red";
         }
         this.selectedOpen = selectedOpen;
         this.selectedOpen = false;
         this.session.tutorSlotID = selectedEvent.id;
       //  this.session.date = selectedEvent.date;
         SessionServices.addSession(this.session);
        this.tutorSlot.studentID = this.user.userID;
        this.tutorSlot.tutorSlotID = selectedEvent.id;
        console.log(selectedEvent.id + "just before update TS");
                    console.log(this.tutorSlot.length + "length");

         TutorSlotServices.updateTutorSlot(this.tutorSlot);
      }
      }
      else {
        alert(
            "This session is already booked!"

          );
          this.selectedOpen = false;
      }
    },

    signUp(selectedEvent, session, selected, selectedOpen) {
       if (selectedEvent.name != "Booked") {
      if (confirm("Do you want to sign up for this group session?")) {
         this.user = Utils.getStore('user');
         this.session = session;
         this.session.studentID = this.user.userID;
         this.session.tutorID = selected[0].userID;
         this.session.scheduledStart = selectedEvent.start;
         this.session.scheduledEnd = selectedEvent.end;
         this.session.status = "Upcoming";
         this.session.locationID = "1";
         if (selectedEvent.name != "Group Session") {
         selectedEvent.name = "Booked";
         selectedEvent.color = "red";
         }
         this.selectedOpen = selectedOpen;
         this.selectedOpen = false;
         this.session.tutorSlotID = selectedEvent.id;
       //  this.session.date = selectedEvent.date;
         SessionServices.addSession(this.session);
        //this.tutorSlot.studentID = this.user.userID;
        //this.tutorSlot.tutorSlotID = selectedEvent.id;


         //TutorSlotServices.updateTutorSlot(this.tutorSlot);
      }
      }
      else {
        alert(
            "This session is already booked!"

          );
          this.selectedOpen = false;
      }

    },
    findTutor(subjectID, level) {
      console.log(subjectID);
      console.log(level);
    },
    viewSession({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          console.log(event.id);
          this.selectedElement = nativeEvent.target
          
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }
        
        nativeEvent.stopPropagation()
      },
    // Get and display tutor slots for selected tutor
    getTutorSlots(selected) {
      this.events = [];
      TutorSlotServices.getTutorSlotForTutor(selected[0].userID).then(
        (response) => {
          for (let i = 0; i < response.data.length; i++) {
            var days = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            var today = new Date();
            today.getDay();
               if (today.getDay() === "Sunday") {
                 this.z = 0;
               }
                if (today.getDay() === "Monday") {
                 this.z = 1;
               }
                if (today.getDay() === "Tuesday") {
                 this.z = 2;
               }
                if (today.getDay() === "Wednesday") {
                 this.z = 3;
               }
                if (today.getDay() === "Thursday") {
                 this.z = 4;
               }
                if (today.getDay() === "Friday") {
                 this.z = 5;
               }
                if (today.getDay() === "Saturday") {
                 this.z = 6;
               }
            // display tutor slots for each day after current day
            for (let j = 0; j < 6; j++) {
              if (response.data[i].day == days[j]) {
                // create date for next day in the week
                

                console.log(response.data[i].day)
                var tomorrow = new Date();
                console.log (this.z + " " + j);
                tomorrow.setDate((tomorrow.getDate() + j) - today.getDay());

                var month2 = tomorrow.getUTCMonth() + 1; //months from 1-12
                if (month2 < 10) {
                  month2 = "0" + month2;
                }
                var day2 = tomorrow.getUTCDate();
                var year2 = tomorrow.getUTCFullYear();
                let newdate2 = year2 + "-" + month2 + "-" + day2;
                let starttime2 = newdate2 + " " + response.data[i].startTime;
                let endtime2 = newdate2 + " " + response.data[i].endTime;
                if (response.data[i].studentID == null && response.data[i].status == "Private Session") {
                this.name1 = "Open Slot";
                this.color = "green";

                }
                else if (response.data[i].status == "Group Session") {
                this.name1 = "Group Session";
                this.color = "blue";

                }
                else {
                  this.name1 = "Booked";
                  this.color = "red";
                };
                let index = days.indexOf(response.data[i].day)
                console.log(index)
                console.log(tomorrow.getDay())
                if (index >= today.getDay()) {
                this.events.push({
                  id: response.data[i].tutorSlotID,
                  name: this.name1,
                  date: newdate2,
                  start: starttime2,
                  color: this.color,
                  end: endtime2,
                  details: response.data[i].startTime + " - " + response.data[i].endTime,
                  
                });
                }
              }
            }
          }
        }
      );
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
  },
};


</script>

<style  scoped>
</style>


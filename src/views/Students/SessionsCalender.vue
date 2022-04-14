
<template>
  <v-row class="fill-height">
    <v-col>
      <v-btn fab text small color="grey darken-2" @click="prev">
        <v-icon small> mdi-chevron-left </v-icon>
      </v-btn>
      <v-btn fab text small color="grey darken-2" @click="next">
        <v-icon small> mdi-chevron-right </v-icon>
      </v-btn>
      <br />
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          :first-interval="6"
          :interval-count="19"
          :events="events"
          @click:event="viewSession"
          @change="getSessions"
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
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar style="background-color: #1976d2; color: #f2f2f2">
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text v-if="selectedElement != null">
              <span v-html="'Tutor: ' + getTutor(selectedEvent)"></span>
              <br />
              <span v-html="'Type: ' + getType(selectedEvent)"></span>
              <br />
              <span v-html="'Location: ' + getLocation(selectedEvent)"></span>
                            <br />
              <span v-html="'Time: ' + selectedEvent.startTime"></span>
              <br />
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="selectedEvent.name == 'Completed Session'"
                text
                color="secondary"
                @click="giveFeedback(selectedEvent)"
              >
                Give Feedback
              </v-btn>

              <v-dialog v-model="dialog2" hide-overlay scrollable max-width="300px">
              <template v-slot:activator="{ on, attrs }">
              <v-btn v-if="selectedEvent.name != 'Completed Session'"
                text
                color="error"
                v-bind="attrs"
                v-on="on"
              >
                Cancel Session
              </v-btn>
              </template>
                             <v-card>
        <v-card-text style="height: 300px">

                <v-textarea
                v-model="session.feedback"
                  label="Reason for cancellation"
                ></v-textarea>

 <v-card-actions>
          <v-divider></v-divider>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog2 = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="cancelSession(selectedEvent, session)"
          >
            Confirm Cancellation
          </v-btn>
        </v-card-actions>
        </v-card-text>
         </v-card>
              </v-dialog>



              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import SessionServices from "@/services/sessionServices.js";
import UserServices from "@/services/UserServices.js";
import LocationServices from "@/services/locationServices.js";
import Utils from "@/config/utils.js";
import TutorSlotServices from "@/services/tutorSlotServices.js";
import smsServices from "@/services/smsServices.js";


  export default {
    data: () => ({
      value: '',
      events: [],
      colors: ['#4CAF50'],
      names: ['Open Slot'],
      dragEvent: null,
      dragStart: null,
      createEvent: null,
      createStart: null,
      extendOriginal: null,
      session: {},
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      month: '',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      i: 0,
      color: null,
      name1: null,
      name2: null,
      build: null,
      room: null,
      type: null,
      tutorSlot: null,
      dialog2: false,
      urlForSession: "",
    }),
  methods: {
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    giveFeedback(selectedEvent) {
      console.log(selectedEvent.id);
      this.$router.push({
        name: "giveFeedback",
        params: { id: selectedEvent.id },
      });
    },
    
cancelSession(event, session) {
      this.session = session;
      let id = event.id;
      if (confirm("Do you really want to cancel this session?")) {
        SessionServices.getSession(id).then((response) => {
          this.sendNotification(event, event.tutorID);
          this.sessionToCancel = response.data;
          this.sessionToCancel.feedback = this.session.feedback;
          this.sessionToCancel.status = "Canceled";
          let tsID = this.sessionToCancel.tutorSlotID;
          this.sessionToCancel.tutorSlotID = null;
          SessionServices.updateSession(this.sessionToCancel).then(() => {
            this.session = [];
          TutorSlotServices.getTutorSlot(tsID).then((response1) => {
            this.sessionBeingCanceled = response1.data;
            this.sessionBeingCanceled.studentID = null;
            this.sessionBeingCanceled.tutorSlotRequestID = null;
            this.sessionBeingCanceled.numOfRegistered = null;
            TutorSlotServices.updateTutorSlot(this.sessionBeingCanceled);
            this.selectedOpen = false;
            this.dialog2 = false;

            this.getSessions();


        });
          
          })  
        })

      }
    },

    getType(selectedEvent) {
      return selectedEvent.type;
    },

    getTutor(selectedEvent) {
      UserServices.getUser(selectedEvent.tutorID).then((response) => {
        this.name1 = response.data.fName;
        this.name2 = response.data.lName;
      });
      return this.name1 + " " + this.name2;
    },
    getLocation(selectedEvent) {
      console.log("HERE");
      if (selectedEvent.locationID != null) {
        LocationServices.getLocation(selectedEvent.locationID).then(
          (response) => {
            console.log(response);
            this.build = response.data.building;
            if (this.build == "Virtual") {
              this.room = "<br>" + "URL: " + "<a href='http://www."+selectedEvent.link +"'target='_blank'>" + selectedEvent.link +"</a>";
            }
            else {
            this.room = response.data.roomNum;
            }
          }
        );
        return this.build + ", " + this.room;
      } else {
        return "Not set at this time.";
      }
    },

    viewSession({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },

    getSessions() {
      this.events = [];
      console.log(this.events.length);
      this.user = Utils.getStore("user");

      SessionServices.getSessions().then((response) => {
        console.log(response.data);
        for (this.i = 0; this.i < response.data.length; this.i++) {
          console.log(response.data.length);
          if (this.user.userID == response.data[this.i].studentID) {
            if (response.data[this.i].status === "Complete") {
              let starttime1 = response.data[this.i].scheduledStart;
              starttime1 = starttime1.replace("Z", "");
              starttime1 = starttime1.replace("T", " ");
              starttime1 = starttime1.replace(".", "");
              console.log(starttime1 + "testing");
              starttime1 = starttime1.substring(0, starttime1.length);
             let starttime2 = starttime1.substring(10, starttime1.length)

              let endtime = response.data[this.i].scheduledEnd;
              endtime = endtime.replace("Z", "");
              endtime = endtime.replace("T", " ");
              console.log(endtime + "testing");

              endtime = endtime.replace(".", "");
              endtime = endtime.substring(0, endtime.length);

              this.events.push({
                id: response.data[this.i].sessionID,
                name: "Completed Session",
                start: starttime1,
                startTime: starttime2,
                end: endtime,
                color: "grey",
                details: "tutor name and session location",
                locationID: response.data[this.i].locationID,
                tutorID: response.data[this.i].tutorID,
                type: response.data[this.i].Type,
              });
              console.log(this.events);
            }
            if (response.data[this.i].status === "Upcoming") {
              let starttime1 = response.data[this.i].scheduledStart;
              starttime1 = starttime1.replace("Z", "");
              starttime1 = starttime1.replace("T", " ");
              starttime1 = starttime1.replace(".", "");
              starttime1 = starttime1.substring(0, starttime1.length);
             let starttime2 = starttime1.substring(10, starttime1.length)
              let endtime = response.data[this.i].scheduledEnd;
              endtime = endtime.replace("Z", "");
              endtime = endtime.replace("T", " ");
              endtime = endtime.replace(".", "");
              endtime = endtime.substring(0, endtime.length);
              if (response.data[this.i].url != null) {
              this.urlForSession = response.data[this.i].url;
              }
              else {
              this.urlForSession = "URL not yet set."
              }

              this.events.push({
                id: response.data[this.i].sessionID,
                name: "Upcoming Session",
                start: starttime1,
                startTime: starttime2,
                end: endtime,
                link: this.urlForSession,
                color: "blue",
                details: "tutor name and session location",
                locationID: response.data[this.i].locationID,
                tutorID: response.data[this.i].tutorID,
                tutorSlotID: response.data[this.i].tutorSlotID,
                type: response.data[this.i].Type,
              });
              console.log(this.events);
            }
            if (response.data[this.i].status === "Pending") {
              console.log("HERE");
              let starttime1 = response.data[this.i].scheduledStart;
              starttime1 = starttime1.replace("Z", "");
              starttime1 = starttime1.replace("T", " ");
              starttime1 = starttime1.replace(".", "");
              starttime1 = starttime1.substring(0, starttime1.length);
             let starttime2 = starttime1.substring(10, starttime1.length)

              let endtime = response.data[this.i].scheduledEnd;
              endtime = endtime.replace("Z", "");
              endtime = endtime.replace("T", " ");
              endtime = endtime.replace(".", "");
              endtime = endtime.substring(0, endtime.length);

              this.events.push({
                id: response.data[this.i].sessionID,
                name: "Pending Session",
                start: starttime1,
                startTime: starttime2,
                end: endtime,
                color: "purple",
                details: "tutor name and session location",
                locationID: response.data[this.i].locationID,
                tutorID: response.data[this.i].tutorID,
                tutorSlotID: response.data[this.i].tutorSlotID,
                type: response.data[this.i].Type,
              });
              console.log(this.events);
            }
          }
        }
        console.log(this.events);
      });
    },
    sendNotification(event, tutorID) {
      UserServices.getUser(this.user.userID).then((user) => {
        UserServices.getUser(tutorID).then((tutor) => {
          console.log(user.data.phoneNumber + " " + user.data.email);
          console.log("Event Start: " + event.start.substring(0, event.start.indexOf(":") - 2));
          let date = event.start.substring(0, event.start.indexOf(":") - 2);
          let startTime = event.start.substring(event.start.indexOf(":") - 2);
          tutor.data.subject = "Tutor Session Cancelled";
          tutor.data.message =
            "Your session with " +
            tutor.data.fName +
            " " +
            tutor.data.lName +
            " for " +
            date +
            " at " +
            startTime +
            " has been cancelled. Reason: " +
            this.session.feedback;
          smsServices.sendMessage(tutor.data);
        });
      });
    },
  },
};

</script>

<template>
  <v-row class="fill-height">
    <v-col>
      <v-row justify="center">
        <v-checkbox
          :label="`Private Session`"
          v-model="checkbox1"
          @change="checkbox12"
        ></v-checkbox>
        <v-checkbox
          :label="`Group Session`"
          v-model="checkbox2"
          @change="checkbox23"
        ></v-checkbox>
      </v-row>
      <br />
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          color="#2c9292"
          type="week"
          :first-interval="6"
          :interval-count="19"
          :events="events"
          :event-color="getEventColor"
          :event-ripple="false"
          @click:event="viewSession"
          @mousedown:event="startDrag"
          @mousedown:time="startTime"
          @mousemove:time="mouseMove"
          @mouseup:time="endDrag"
          @mouseleave.native="cancelDrag"
        >
          <template v-slot:event="{ event, timed, eventSummary }">
            <div class="v-event-draggable" v-html="eventSummary()"></div>
            <div
              v-if="timed"
              class="v-event-drag-bottom"
              @mousedown.stop="extendBottom(event)"
            ></div>
          </template>
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar style="background-color: #2c9292; color: #f2f2f2">
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <span
                v-if="selectedEvent.name == 'Group Session'"
                v-html="'Students: ' + this.someValue"
              ></span>
              <span
                v-if="selectedEvent.name == 'Booked'"
                v-html="'Student: ' + getName(selectedEvent)"
              ></span>
              <span
                v-if="selectedEvent.name == 'Pending'"
                v-html="'Student: ' + getName(selectedEvent)"
              ></span>
              <br />
              <span
                v-if="selectedEvent.numRegistered > 0"
                v-html="'Location: ' + this.someLocation"
              ></span>
              <br />
              <span v-html="'Day: ' + selectedEvent.day"></span>
              <br />
              <span v-html="'Time: ' + selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="selectedEvent.numRegistered == null"
                text
                color="error"
                @click="removeTimeSlot(selectedEvent)"
              >
                Remove
              </v-btn>
              <v-btn
                v-if="
                  selectedEvent.day == selectedEvent.today &&
                  selectedEvent.numRegistered > 0
                "
                text
                color="black"
                @click="markComplete(selectedEvent)"
              >
                Mark Complete
              </v-btn>
              <!-- <v-btn
                v-if="selectedEvent.numRegistered > 0"
                text
                color="error"
                @click="cancelSession(selectedEvent)"
              >
                Cancel
              </v-btn> -->
              <v-dialog v-if="selectedEvent.numRegistered > 0" v-model="dialog2" scrollable max-width="300px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    color="red"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Cancel
                  </v-btn>
                </template>
                <v-card>
                  <v-textarea v-model="cancelReason" color="teal">
                    <template v-slot:label>
                      <div>Cancel Reason</div>
                    </template>
                  </v-textarea>
                  <v-card-actions>
                    <v-btn
                      color="red"
                      text
                      @click="cancelSession(selectedEvent)"
                    >
                      Cancel Session
                    </v-btn>
                    <v-btn color="black" text @click="dialog2 = false">
                      Back
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-if="selectedEvent.numRegistered > 0" v-model="dialog" scrollable max-width="300px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    color="black"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Set Location
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>Select Location</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text style="height: 300px">
                    <v-select
                      v-model="location"
                      :items="locations"
                      label="Location List"
                      :item-text="getLocations"
                      item-value="locationID"
                      dense
                      outlined
                    >
                    </v-select>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      color="#247b7b"
                      text
                      @click="setLocation(selectedEvent, location)"
                    >
                      Save
                    </v-btn>
                    <v-btn color="black" text @click="dialog = false">
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-btn
                v-if="selectedEvent.name == 'Pending'"
                text
                color="black"
                @click="confirm(selectedEvent)"
              >
                Confirm
              </v-btn>
              <!-- <v-btn
                v-if="selectedEvent.name == 'Pending'"
                text
                color="error"
                @click="deny(selectedEvent)"
              >
                Deny
              </v-btn> -->

              <v-dialog v-if="selectedEvent.name == 'Pending'" v-model="dialog3" scrollable max-width="300px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    color="red"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Deny
                  </v-btn>
                </template>
                <v-card>
                  <v-textarea v-model="cancelReason" color="teal">
                    <template v-slot:label>
                      <div>Deny Reason</div>
                    </template>
                  </v-textarea>
                  <v-card-actions>
                    <v-btn
                      color="red"
                      text
                      @click="deny(selectedEvent)"
                    >
                      Deny Session
                    </v-btn>
                    <v-btn color="black" text @click="dialog3 = false">
                      Back
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-btn text color="#247b7b" @click="selectedOpen = false">
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
import TutorSlotServices from "@/services/tutorSlotServices.js";
import sessionServices from "@/services/sessionServices.js";
import userServices from "@/services/UserServices.js";
import Utils from "@/config/utils.js";
import locationServices from "@/services/locationServices.js";
import smsServices from "@/services/smsServices.js";
import SessionServices from "@/services/sessionServices.js";
import UserServices from "@/services/UserServices.js";

export default {
  data: () => ({
    locations: [],
    location: "",
    value: "",
    events: [],
    colors: ["#4CAF50"],
    names: ["Open Slot"],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    tutorSlot: {},
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    month: "",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    checkbox1: false,
    checkbox2: false,
    confirmTutorSlot: {},
    denyTutorSlot: {},
    confirmSession: {},
    student: {},
    studentName: "",
    someValue: "",
    dialogm1: "",
    someLocation: "",
    dialog: false,
    dialog2: false,
    dialog3: false,
    sessionComplete: [{}],
    studentsForGroupSession: [{}],
    cancelReason: "",
  }),
  created() {
    locationServices.getLocations().then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        this.locations[i] = response.data[i];
      }
    });
    this.user = Utils.getStore("user");

    TutorSlotServices.getTutorSlotForTutor(this.user.userID).then(
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
          console.log(today.getDay() + "today");
          if (today.getDay() === 0) {
            this.z = "Sunday";
          }
          if (today.getDay() === 1) {
            this.z = "Monday";
          }
          if (today.getDay() === 2) {
            this.z = "Tuesday";
          }
          if (today.getDay() === 3) {
            this.z = "Wednesday";
          }
          if (today.getDay() === 4) {
            this.z = "Thursday";
          }
          if (today.getDay() === 5) {
            this.z = "Friday";
          }
          if (today.getDay() === 6) {
            this.z = "Saturday";
          }
          console.log(this.z + "todays date return");
          // display tutor slots for each day after current day
          for (let j = 0; j < 6; j++) {
            if (response.data[i].day == days[j]) {
              // create date for next day in the week
              this.thisDay = response.data[i].day;

              var tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + j - today.getDay());
              var month2 = tomorrow.getUTCMonth() + 1; //months from 1-12
              if (month2 < 10) {
                month2 = "0" + month2;
              }
              var day2 = tomorrow.getUTCDate();
              var year2 = tomorrow.getUTCFullYear();
              let newdate2 = year2 + "-" + month2 + "-" + day2;
              let starttime2 = newdate2 + " " + response.data[i].startTime;
              let endtime2 = newdate2 + " " + response.data[i].endTime;
              if (
                response.data[i].studentID == null &&
                response.data[i].status == "Private Session"
              ) {
                this.name1 = "Open Slot";
                this.color = "green";
                this.studentIDForEvent = "";
                this.numReg = null;
              } else if (response.data[i].status == "Group Session") {
                this.name1 = "Group Session";
                this.color = "blue";
                this.studentIDForEvent = "";
                this.numReg = response.data[i].numOfRegistered;
              } else if (response.data[i].tutorSlotRequestID == "1") {
                this.name1 = "Pending";
                this.color = "purple";
                this.studentIDForEvent = response.data[i].studentID;
                this.numReg = "0";
              } else {
                this.name1 = "Booked";
                this.color = "red";
                this.studentIDForEvent = response.data[i].studentID;
                this.numReg = "1";
              }
              this.events.push({
                id: response.data[i].tutorSlotID,
                studentID: this.studentIDForEvent,
                name: this.name1,
                date: newdate2,
                day: this.thisDay,
                start: starttime2,
                end: endtime2,
                numRegistered: this.numReg,
                today: this.z,
                details:
                  response.data[i].startTime + " - " + response.data[i].endTime,
              });
            }
          }
        }
      }
    );
  },
  methods: {
    startDrag({ event, timed }) {
      if (event && timed) {
        this.dragEvent = event;
        this.dragTime = null;
        this.extendOriginal = null;
      }
    },
    startTime(tms) {
      if (this.checkbox1 || this.checkbox2) {
        const mouse = this.toTime(tms);

        if (this.dragEvent && this.dragTime === null) {
          const start = this.dragEvent.start;

          this.dragTime = mouse - start;
        } else {
          this.name1 = "";
          this.createStart = this.roundTime(mouse);
          if (this.checkbox1) {
            this.name1 == "Open Slot";
          } else if (this.checkbox2) {
            this.name1 == "Group Session";
          }
          this.createEvent = {
            name: this.name1,
            start: this.createStart,
            end: this.createStart,
            timed: true,
          };

          this.events.push(this.createEvent);
        }
      }
    },
    extendBottom(event) {
      this.createEvent = event;
      this.createStart = event.start;
      this.extendOriginal = event.end;
    },
    mouseMove(tms) {
      const mouse = this.toTime(tms);

      if (this.dragEvent && this.dragTime !== null) {
        const start = this.dragEvent.start;
        const end = this.dragEvent.end;
        const duration = end - start;
        const newStartTime = mouse - this.dragTime;
        const newStart = this.roundTime(newStartTime);
        const newEnd = newStart + duration;

        this.dragEvent.start = newStart;
        this.dragEvent.end = newEnd;
      } else if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false);
        const min = Math.min(mouseRounded, this.createStart);
        const max = Math.max(mouseRounded, this.createStart);

        this.createEvent.start = min;
        this.createEvent.end = max;
      }
    },
    endDrag() {
      this.user = Utils.getStore("user");
      this.tutorSlot.tutorID = this.user.userID;
      this.tutorSlot.day = new Date(this.createEvent.start).toLocaleDateString(
        "en-US",
        { weekday: "long" }
      );
      this.tutorSlot.startTime =
        new Date(this.createEvent.start).getHours() +
        ":" +
        new Date(this.createEvent.start).getMinutes() +
        ":" +
        new Date(this.createEvent.start).getSeconds();
      this.tutorSlot.endTime =
        new Date(this.createEvent.end).getHours() +
        ":" +
        new Date(this.createEvent.end).getMinutes() +
        ":" +
        new Date(this.createEvent.end).getSeconds();
      if (this.checkbox1) {
        this.tutorSlot.status = "Private Session";
      } else if (this.checkbox2) {
        this.tutorSlot.status = "Group Session";
      }
      TutorSlotServices.addTutorSlot(this.tutorSlot);
      this.dragTime = null;
      this.dragEvent = null;
      this.createEvent = null;
      this.createStart = null;
      this.extendOriginal = null;
      this.$router.go();
    },
    cancelDrag() {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.createEvent.end = this.extendOriginal;
        } else {
          const i = this.events.indexOf(this.createEvent);
          if (i !== -1) {
            this.events.splice(i, 1);
          }
        }
      }

      this.createEvent = null;
      this.createStart = null;
      this.dragTime = null;
      this.dragEvent = null;
    },
    roundTime(time, down = true) {
      const roundTo = 15; // minutes
      const roundDownTime = roundTo * 60 * 1000;

      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    toTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
    },
    getEventColor(event) {
      if (event.name == "Group Session") {
        this.color = "blue";
      } else if (event.name == "Open Slot") {
        this.color = "green";
      } else if (event.name == "Booked") {
        this.color = "red";
      } else if (event.name == "Pending") {
        this.color = "purple";
      } else {
        this.color = "grey";
      }

      return this.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    },

    async viewSession({ nativeEvent, event }) {
      console.log("here");
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

      await this.getLocation(event);
      await this.getNames(event);
    },

    removeTimeSlot(selectedEvent) {
      if (confirm("Do you want to delete this time slot?")) {
        console.log(selectedEvent.id);
        TutorSlotServices.deleteTutorSlot(selectedEvent.id);
        for (let i = 0; i < this.events.length; i++) {
          if (this.events[i].id === selectedEvent.id) {
            this.events.splice(i, 1);
          }
        }
      }

      this.selectedOpen = false;
    },
    confirm(event) {
      TutorSlotServices.getTutorSlot(event.id).then((response) => {
        this.confirmTutorSlot = response.data;
        console.log(
          "Confirm Session Student ID: " + this.confirmTutorSlot.studentID
        );
        this.sendNotification(
          this.confirmTutorSlot.studentID,
          "Confirm",
          event,
          null,
          null
        );
        this.confirmTutorSlot.tutorSlotRequestID = null;
        this.confirmTutorSlot.numOfRegistered = "1";
        console.log("in confirm");
        TutorSlotServices.updateTutorSlot(this.confirmTutorSlot);
        sessionServices.getSessionByTutorSlot(event.id).then((response) => {
          this.confirmSession = response.data[0];
          this.confirmSession.status = "Upcoming";
          sessionServices.updateSession(this.confirmSession);

          this.selectedOpen = false;
          let d = new Date(event.start);
          console.log(d);
          console.log("Response Session ID: " + this.confirmSession.sessionID);
          console.log("Student ID in confirm: " + this.confirmTutorSlot.studentID);
          this.sendReminder(
            d,
            event,
            this.confirmSession.studentID,
            this.confirmSession.sessionID
          );
          //this.$router.go(); //will need to show students name
        });
      }),
        (event.color = "red");
      event.name = "Booked";
    },
    deny(event) {
      TutorSlotServices.getTutorSlot(event.id).then((response) => {
        this.confirmTutorSlot = response.data;
        console.log(
          "Deny Session Student ID: " + this.confirmTutorSlot.studentID
        );
        this.sendNotification(
          this.confirmTutorSlot.studentID,
          "Deny",
          event,
          null,
          null
        );
        this.confirmTutorSlot.tutorSlotRequestID = null;
        this.confirmTutorSlot.studentID = null;
        TutorSlotServices.updateTutorSlot(this.confirmTutorSlot);
        sessionServices.deleteSessionByTutorSlotID(event.id);
        this.selectedOpen = false;
      }),
        (event.color = "green");
      event.name = "Open Slot";
    },
    checkbox12() {
      if (this.checkbox1) {
        this.checkbox2 = false;
      }
      console.log(this.checkbox1);
      console.log(this.checkbox2);
    },
    checkbox23() {
      if (this.checkbox2) {
        this.checkbox1 = false;
      }
      console.log(this.checkbox2);
      console.log(this.checkbox1);
    },
    getName(event) {
      let id = event.studentID;
      console.log(id + "in getName function");
      userServices.getUser(id).then((response) => {
        this.student = response.data;
        console.log(this.student.fName + "inside loop");
        this.studentName = this.student.fName + " " + this.student.lName;
      });
      return this.studentName;
    },
    async getNames(event) {
      let id = event.id;
      sessionServices.getSessionByTutorSlot(id).then((response) => {
        console.log(response.data.length + "length of session array");
        if (response.data.length != 0) {
          this.someValue = "";
          for (let i = 0; i < response.data.length; i++) {
            this.studentsForGroupSession[i] = response.data[i];
            userServices
              .getUser(this.studentsForGroupSession[i].studentID)
              .then((response1) => {
                console.log(response1.data.fName + "dudes first name");
                this.someValue +=
                  response1.data.fName + " " + response1.data.lName + "<br>";
              });
          }
        } else {
          this.someValue = "0";
        }
      });
      return this.someValue;
    },

    cancelSession(event) {
      let id = event.id;
      if (confirm("Do you really want to cancel this session?")) {
        sessionServices.deleteSessionByTutorSlotID(id);
        TutorSlotServices.cancelSlot(id).then((response) => {
          this.tutorSlot = response.data[0];
          console.log("Cancel Session Student ID: " + this.tutorSlot.studentID);
          this.sendNotification(
            this.tutorSlot.studentID,
            "Cancel",
            event,
            null,
            null
          );
          this.tutorSlot.studentID = null;
          this.tutorSlot.tutorSlotRequestID = null;
          this.tutorSlot.numOfRegistered = null;
          TutorSlotServices.updateTutorSlot(this.tutorSlot)
            .then(() => {
              sessionServices.deleteSession(id);
            })

            .catch((error) => {
              console.log(error);
            });
        });
      }
      event.color = "green";
      event.name = "Open Slot";
      this.selectedOpen = false;
    },
    sendNotification(userID, type, event, waitTime, sessionID) {
      console.log("in sendNotification");
      userServices.getUser(userID).then((user) => {
        console.log(user.data.phoneNumber + " " + user.data.email);
        let date = event.start.substring(0, event.start.indexOf(":") - 2);
        let startTime = event.start.substring(event.start.indexOf(":") - 2);
        if (type == "Cancel") {
          user.data.subject = "Tutor Session Cancelled";
          user.data.message =
            "Your scheduled session for " +
            date +
            " at " +
            startTime +
            " has been cancelled. Reason: " +
            this.cancelReason;
          this.cancelReason = "";
        } else if (type == "Deny") {
          user.data.subject = "Tutor Session Denied";
          user.data.message =
            "Your requested session for " +
            date +
            " at " +
            startTime +
            " has been denied. Reason: " + this.cancelReason;
            this.cancelReason = "";
        } else if (type == "Confirm") {
          user.data.subject = "Tutor Session Confirmed";
          user.data.message =
            "Your requested session for " +
            date +
            " at " +
            startTime +
            " has been accepted.";
        } else {
          setTimeout(() => {
            console.log("Event ID in schedule: " + sessionID);
            SessionServices.getSession(sessionID).then((session) => {
              console.log("Session ID: " + session.data.sessionID);
              console.log("Loction ID 1: " + session.data.locationID);
              let startTime = event.start.substring(event.start.indexOf(":") - 2);
              if (session.data.locationID != null) {
                locationServices
                  .getLocation(session.data.locationID)
                  .then((location) => {
                    console.log("Session ID: " + session.data.sessionID);
                    console.log("Location ID: " + session.data.locationID);
                    console.log(location.data.building);

                    user.data.subject = "Tutor Session Reminder";
                    user.data.message =
                      "Your scheduled tutor session at " + startTime +  " is starting in 15 minutes in " +
                      location.data.building +
                      " " +
                      location.data.roomNum;
                    smsServices.sendMessage(user.data);
                  });
              } else {
                UserServices.getUser(this.user.userID).then((tutor) => {
                  user.data.subject = "Tutor Session Reminder";
                  user.data.message =
                  "Your scheduled tutor session " + startTime + " is starting in 15 minutes\nEmail your tutor at " +
                    tutor.data.email +
                    " to get the location";
                  smsServices.sendMessage(user.data);
                });
              }
            });
          }, waitTime);
        }
        if (type != "Reminder") smsServices.sendMessage(user.data);
      });
    },
    sendReminder(waitDate, event, userID, sessionID) {
      waitDate = new Date(waitDate - 15 * 60 * 1000);
      console.log("WaitDate: " + waitDate);
      let scheduledTime = waitDate - Date.now();
      console.log("Schedule Send Time: " + scheduledTime);
      this.sendNotification(
        userID,
        "Reminder",
        event,
        scheduledTime,
        sessionID
      );
    },
    setLocation(event, location) {
      console.log(event.id + " " + location + "setLocation");
      sessionServices.getSessionByTutorSlot(event.id).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.sessionForLocation = response.data[i];
          this.sessionForLocation.locationID = location;
          sessionServices.updateSession(this.sessionForLocation);
        }
        this.selectedOpen = false;
      });
    },
    async getLocation(event) {
      let id = event.id;
      await sessionServices.getSessionByTutorSlot(id).then((response) => {
        if (response.data.length != 0 && response.data[0].locationID != null) {
          this.someLocation = "";
          this.sessLoc = response.data[0].locationID;
          locationServices.getLocation(this.sessLoc).then((response1) => {
            this.build = response1.data.building;
            this.room = response1.data.roomNum;
            this.someLocation = this.build + ": " + this.room;
          });
        } else {
          this.someLocation = "None";
        }
      });
      return this.someLocation;
    },
    getLocations(location) {
      return location.building + ": " + location.roomNum;
    },
    markComplete(event) {
      let id = event.id;
      if (confirm("Do you want to mark this session complete?")) {
        sessionServices.getSessionByTutorSlot(id).then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.sessionComplete[i] = response.data[i];
            this.sessionComplete[i].status = "Complete";
            this.sessionComplete[i].tutorSlotID = null;
            sessionServices.updateSession(this.sessionComplete[i]);
          }
        });
        this.tutorSlot.studentID = null;
        this.tutorSlot.numOfRegistered = null;
        this.tutorSlot.tutorSlotID = id;
        TutorSlotServices.updateTutorSlot(this.tutorSlot);
        this.$router.go();
      } else {
        this.selectedOpen = false;
      }
    },
  },
};
</script>

<style  scoped>
</style>

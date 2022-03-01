<template>
  <v-layout>
    <v-flex>
      <v-sheet height="400">
        <v-row>
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
          <v-col>
           <H2 style="background-color: #1976d2; color: #f2f2f2">
            {{ month }}
          </H2>
          </v-col>
        </v-row>
        <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
        <br />
        <v-calendar
          ref="calendar"
          v-model="value"
          :first-interval= 6
          :interval-count= 19
          :events="events"
          @click:event="viewSession"
          color="#1976d2"
          event-text-color="#1976d2"

          type="week"
        >
          <!-- the events at the top (all-day) -->
          <template v-slot:dayHeader="{ date }">
            <template v-for="event in eventsMap[date]">
              <!-- all day events don't have time -->
              <div
                v-if="!event.time"
                :key="event.title"
                class="my-event"
                @click="open(event)"
                v-html="event.title"
              ></div>
            </template>
          </template>
          <!-- the events at the bottom (timed) -->
          <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
            <template v-for="event in eventsMap[date]">
              <!-- timed events -->
              <div
                v-if="event.time"
                :key="event.title"
                :style="{
                  top: timeToY(event.time) + 'px',
                  height: minutesToPixels(event.duration) + 'px',
                }"
                class="my-event with-time"
                @click="open(event)"
                v-html="event.title"
              ></div>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import Utils from "@/config/utils.js";
import UserServices from "@/services/UserServices.js";
import SessionServices from "@/services/sessionServices.js";

  export default {
    data: () => ({
    user: {},
    sessions: {},
    events: [],
    value: '',
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    month: '',
    }),
  async created() {
    // display completed and upcoming sessions depending on
    // if a student or tutor is logged in
    this.user = Utils.getStore("user");
    let d = new Date();
    this.month = this.months[d.getMonth()];
    SessionServices.getSessions()
      .then((response) => {
          response.data.forEach(session => 
          {
            UserServices.getUser(session.studentID) 
            .then((student) => {
                let s = session.scheduledStart;
                let i = s.indexOf("T");
                let st = s.substr(0, i) + " " + s.substr(i+1, 8);
                let e = session.scheduledEnd;
                i = e.indexOf("T");
                let end = e.substr(0, i) + " " + e.substr(i+1, 8);
                if(session.tutorID == this.user.userID)
                    this.events.push({id: session.sessionID, name: "Session: " + student.data.fName + " " + student.data.lName.substr(0,1), start: st, end: end})
            })
            
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
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
  }
  }
</script>

<style  scoped>

</style>


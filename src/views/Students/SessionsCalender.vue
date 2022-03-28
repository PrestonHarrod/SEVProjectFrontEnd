<template>
  <v-row class="fill-height">
    <v-col>
      <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
      <br>
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
            <v-card-text v-if="selectedElement != null">
              <span v-html="'Tutor: ' + getTutor(selectedEvent)"></span>
              <br>
              <span v-html="'Type: ' + getType(selectedEvent)"></span>
              <br>
              <span v-html="'Location: ' + getLocation(selectedEvent)"></span>
              
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="selectedEvent.name == 'Completed Session'"
                text
                color="secondary"
                @click="giveFeedback(selectedEvent)"
              >
              
                Give Feedback
              </v-btn>
              <v-btn v-if="selectedEvent.name != 'Completed Session'"
                text
                color="error"
                @click="removeTimeSlot(selectedEvent)"
              >
              
                Cancel Session
              </v-btn>
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
 import SessionServices from "@/services/sessionServices.js"
 import UserServices from "@/services/UserServices.js";
 import LocationServices from "@/services/locationServices.js"
 import Utils from '@/config/utils.js';
 import TutorSlotServices from '@/services/tutorSlotServices.js'

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
      

    }),
   
    methods: {
      prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    giveFeedback(selectedEvent) {
      console.log(selectedEvent.id)
      this.$router.push({ name: "giveFeedback", params: { id: selectedEvent.id } });
    },

      removeTimeSlot(selectedEvent) {
         if (confirm("Do you want to delete this time slot?")) {
        TutorSlotServices.cancelSlot(selectedEvent.tutorSlotID)
        .then((response) => {
            this.tutorSlot = response.data[0];
            this.tutorSlot.studentID = null;
            TutorSlotServices.updateTutorSlot(this.tutorSlot)
            .then(() => {
            SessionServices.deleteSession(selectedEvent.id)
            })
         })
        for (let i = 0; i < this.events.length; i++) {
          if (this.events[i].id === selectedEvent.id) {
             this.events.splice(i, 1)
          }
        }
         }
          this.selectedOpen = false;
          //this.$router.go();
      
      },

      getType(selectedEvent) {
        return selectedEvent.type;
      },

      getTutor(selectedEvent) {
        UserServices.getUser(selectedEvent.tutorID).then(
            (response) => {
              this.name1 = response.data.fName
              this.name2 = response.data.lName
        })
        return this.name1 + ' ' + this.name2
      },
      getLocation(selectedEvent) {
        console.log("HERE")
        LocationServices.getLocation(selectedEvent.locationID).then(
            (response) => {
              console.log(response)
              this.build = response.data.building
              this.room = response.data.roomNum
        })
        return this.build + ', ' + this.room
      },
      
      viewSession({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
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
      
    getSessions() {
      this.events = []
      console.log(this.events.length);
      this.user = Utils.getStore('user');

      SessionServices.getSessions()
      .then((response) => {
          for (this.i = 0; this.i < response.data.length; this.i++) {
            console.log(response.data.length)
          if (this.user.userID == response.data[this.i].studentID) {
            
            if (response.data[this.i].status === "Complete") {
            let starttime1 = response.data[this.i].scheduledStart
            starttime1 = starttime1.replace('Z', '')
            starttime1 = starttime1.replace('T', ' ')
            starttime1 = starttime1.replace('.', '')
            starttime1 = starttime1.substring(0, starttime1.length)
            
            let endtime = response.data[this.i].scheduledEnd
            endtime = endtime.replace('Z', '')
            endtime = endtime.replace('T', ' ')
            endtime = endtime.replace('.', '')
            endtime = endtime.substring(0, endtime.length)

            this.events.push({
                id: response.data[this.i].sessionID,
                name: "Completed Session",
                start: starttime1,
                end: endtime,
                color: "grey",
                details: "tutor name and session location",
                locationID: response.data[this.i].locationID,
                tutorID: response.data[this.i].tutorID,
                type: response.data[this.i].Type
                
                
            }
            )
            console.log(this.events)
            }
            if (response.data[this.i].status === "Upcoming") {
            let starttime1 = response.data[this.i].scheduledStart
            starttime1 = starttime1.replace('Z', '')
            starttime1 = starttime1.replace('T', ' ')
            starttime1 = starttime1.replace('.', '')
            starttime1 = starttime1.substring(0, starttime1.length)
            
            let endtime = response.data[this.i].scheduledEnd
            endtime = endtime.replace('Z', '')
            endtime = endtime.replace('T', ' ')
            endtime = endtime.replace('.', '')
            endtime = endtime.substring(0, endtime.length)

            
            this.events.push({
                id: response.data[this.i].sessionID,
                name: "Upcoming Session",
                start: starttime1,
                end: endtime,
                color: "blue",
                details: "tutor name and session location",
                locationID: response.data[this.i].locationID,
                tutorID: response.data[this.i].tutorID,
                tutorSlotID: response.data[this.i].tutorSlotID,
                type: response.data[this.i].Type

                
            }
            )
            console.log(this.events)
            }
            if (response.data[this.i].status === "Pending") {
              console.log("HERE")
            let starttime1 = response.data[this.i].scheduledStart
            starttime1 = starttime1.replace('Z', '')
            starttime1 = starttime1.replace('T', ' ')
            starttime1 = starttime1.replace('.', '')
            starttime1 = starttime1.substring(0, starttime1.length)
            
            let endtime = response.data[this.i].scheduledEnd
            endtime = endtime.replace('Z', '')
            endtime = endtime.replace('T', ' ')
            endtime = endtime.replace('.', '')
            endtime = endtime.substring(0, endtime.length)

            
            this.events.push({
                id: response.data[this.i].sessionID,
                name: "Pending Session",
                start: starttime1,
                end: endtime,
                color: "purple",
                details: "tutor name and session location",
                locationID: response.data[this.i].locationID,
                tutorID: response.data[this.i].tutorID,
                tutorSlotID: response.data[this.i].tutorSlotID,
                type: response.data[this.i].Type

                
            }
            )
            console.log(this.events)
            }
         
          
         
          }
        }
        console.log(this.events)
      })
    },
    
    
      },
  }
</script>
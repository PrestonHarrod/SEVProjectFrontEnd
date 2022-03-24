<template>
  <v-row class="fill-height">
    <v-col>
      <br>
      <v-sheet height="600">
        <v-calendar
            ref="calendar"
            v-model="value"
            :first-interval="6"
            :interval-count="19"
            :events="events"
            @click:event="viewSession"
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
              <span v-html="'Tutor: ' + getTutor(selectedEvent)"></span>
              <br>
              <span v-html="'Location: ' + getLocation(selectedEvent)"></span>
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
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
 import SessionServices from "@/services/sessionServices.js"
 import UserServices from "@/services/UserServices.js";
 import LocationServices from "@/services/locationServices.js"
 import Utils from '@/config/utils.js';

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
      

    }),
   
    methods: {

      getTutor(selectedEvent) {
        UserServices.getUser(selectedEvent.tutorID).then(
            (response) => {
              this.name1 = response.data.fName
              this.name2 = response.data.lName
        })
        return this.name1 + ' ' + this.name2
      },
      getLocation(selectedEvent) {
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
      
    getTutorSlots() {
      console.log(this.events.length);
      this.user = Utils.getStore('user');

      SessionServices.getSessions()
      .then((response) => {
          for (this.i = 0; this.i < response.data.length; this.i++) {
          if (this.user.userID == response.data[this.i].studentID) {
            if (response.data[this.i].status === "Complete") {
            let starttime1 = response.data[this.i].scheduledStart
            starttime1 = starttime1.replace('Z', '')
            starttime1 = starttime1.replace('T', ' ')
            starttime1 = starttime1.replace('.', '')
            starttime1 = starttime1.substring(0, starttime1.length - 6)
            
            let endtime = response.data[this.i].scheduledEnd
            endtime = endtime.replace('Z', '')
            endtime = endtime.replace('T', ' ')
            endtime = endtime.replace('.', '')
            endtime = endtime.substring(0, endtime.length - 6)

            this.events.push({
                id: response.data[this.i].sessionID,
                name: "Completed Session",
                start: starttime1,
                end: endtime,
                color: "grey",
                details: "tutor name and session location",
                locationID: response.data[this.i].locationID,
                tutorID: response.data[this.i].tutorID,
                
                
            }
            )
            console.log(this.events)
            }
            if (response.data[this.i].status === "Upcoming") {
            let starttime1 = response.data[this.i].scheduledStart
            starttime1 = starttime1.replace('Z', '')
            starttime1 = starttime1.replace('T', ' ')
            starttime1 = starttime1.replace('.', '')
            starttime1 = starttime1.substring(0, starttime1.length - 6)
            
            let endtime = response.data[this.i].scheduledEnd
            endtime = endtime.replace('Z', '')
            endtime = endtime.replace('T', ' ')
            endtime = endtime.replace('.', '')
            endtime = endtime.substring(0, endtime.length - 6)

            
            this.events.push({
                id: response.data[this.i].sessionID,
                name: "Upcoming Session",
                start: starttime1,
                end: endtime,
                color: "blue",
                details: "tutor name and session location",
                locationID: response.data[this.i].locationID,
                tutorID: response.data[this.i].tutorID

                
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
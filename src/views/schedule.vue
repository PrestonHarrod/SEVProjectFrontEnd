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
      <br>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          color="primary"
          type = "week"
          :first-interval= 6
          :interval-count= 19
          :events="events"
          :event-color="getEventColor"
          :event-ripple="false"
          @click:event="viewSession"
          @change="getTutorSlots"
          @mousedown:event="startDrag"
          @mousedown:time="startTime"
          @mousemove:time="mouseMove"
          @mouseup:time="endDrag"
          @mouseleave.native="cancelDrag"
        >
          <template v-slot:event="{ event, timed, eventSummary }">
            <div
              class="v-event-draggable"
              v-html="eventSummary()"
            ></div>
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
              <v-btn v-if="selectedEvent.name != 'Booked'"
                text
                color="error"
                @click="removeTimeSlot(selectedEvent)"
              >
                Remove
              </v-btn>
              <v-btn
                text
                color="primary"
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
 import TutorSlotServices from "@/services/tutorSlotServices.js"
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
      tutorSlot: {},
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      month: '',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      checkbox1: false,
      checkbox2: false

    }),
   
    methods: {
      startDrag ({ event, timed }) {
        if (event && timed) {
          this.dragEvent = event
          this.dragTime = null
          this.extendOriginal = null
        }
      },
      startTime (tms) {
        if (this.checkbox1 || this.checkbox2) {
        const mouse = this.toTime(tms)

        if (this.dragEvent && this.dragTime === null) {
          const start = this.dragEvent.start

          this.dragTime = mouse - start
        } else {
          this.name1 = "";
          this.createStart = this.roundTime(mouse)
          if (this.checkbox1) {
            this.name1 == "Open Slot"
          }
          else if (this.checkbox2) {
            this.name1 == "Group Session"

          }
          this.createEvent = {
            name: this.name1,
            start: this.createStart,
            end: this.createStart,
            timed: true,
          }
          
          this.events.push(this.createEvent)
        }
        }
      },
      extendBottom (event) {
        this.createEvent = event
        this.createStart = event.start
        this.extendOriginal = event.end
      },
      mouseMove (tms) {
        const mouse = this.toTime(tms)

        if (this.dragEvent && this.dragTime !== null) {
          const start = this.dragEvent.start
          const end = this.dragEvent.end
          const duration = end - start
          const newStartTime = mouse - this.dragTime
          const newStart = this.roundTime(newStartTime)
          const newEnd = newStart + duration

          this.dragEvent.start = newStart
          this.dragEvent.end = newEnd
        } else if (this.createEvent && this.createStart !== null) {
          const mouseRounded = this.roundTime(mouse, false)
          const min = Math.min(mouseRounded, this.createStart)
          const max = Math.max(mouseRounded, this.createStart)

          this.createEvent.start = min
          this.createEvent.end = max
        }
      },
      endDrag () {
        this.user = Utils.getStore('user');
         this.tutorSlot.tutorID = this.user.userID;
            this.tutorSlot.day = new Date(this.createEvent.start).toLocaleDateString("en-US", { weekday: 'long' })
            this.tutorSlot.startTime = new Date(this.createEvent.start).getHours() + ":" + new Date(this.createEvent.start).getMinutes() + ":" + new Date(this.createEvent.start).getSeconds();
            this.tutorSlot.endTime = new Date(this.createEvent.end).getHours() + ":" + new Date(this.createEvent.end).getMinutes() + ":" + new Date(this.createEvent.end).getSeconds();
            if (this.checkbox1) {
              this.tutorSlot.status = "Private Session";
            }
            else if (this.checkbox2) {
              this.tutorSlot.status = "Group Session";
            }
            TutorSlotServices.addTutorSlot(this.tutorSlot);
        this.dragTime = null
        this.dragEvent = null
        this.createEvent = null
        this.createStart = null
        this.extendOriginal = null
                  this.$router.go();

      },
      cancelDrag () {
        if (this.createEvent) {
          if (this.extendOriginal) {
            this.createEvent.end = this.extendOriginal
          } else {
            const i = this.events.indexOf(this.createEvent)
            if (i !== -1) {
              this.events.splice(i, 1)
            }
          }
        }

        this.createEvent = null
        this.createStart = null
        this.dragTime = null
        this.dragEvent = null
      },
      roundTime (time, down = true) {
        const roundTo = 15 // minutes
        const roundDownTime = roundTo * 60 * 1000

        return down
          ? time - time % roundDownTime
          : time + (roundDownTime - (time % roundDownTime))
      },
      toTime (tms) {
        return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
      },
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
       else {
         this.color = "grey"
       }

       return this.color;
      },
    getTutorSlots() {
      console.log(this.events.length);
      this.user = Utils.getStore('user');

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
                

                var tomorrow = new Date();
                tomorrow.setDate((tomorrow.getDate() + j) - (today.getDay()));
                console.log(today.getDay())
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
                }
                else if (response.data[i].status == "Group Session") {
                this.name1 = "Group Session";
                }
                else {
                  this.name1 = "Booked";
                };

                this.events.push({
                  id: response.data[i].tutorSlotID,
                  name: this.name1,
                  date: newdate2,
                  start: starttime2,
                  end: endtime2,
                  details: response.data[i].startTime + " - " + response.data[i].endTime,
                  
                });
                console.log(this.events);
                
              }
            }
          }
        }
      );
    },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      rndElement (arr) {
        return arr[this.rnd(0, arr.length - 1)]
      },
    
     viewSession({ nativeEvent, event }) {
       console.log("here");
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

      removeTimeSlot(selectedEvent) {
         if (confirm("Do you want to delete this time slot?")) {
        console.log(selectedEvent.id)
        TutorSlotServices.deleteTutorSlot(selectedEvent.id);
        for (let i = 0; i < this.events.length; i++) {
          if (this.events[i].id === selectedEvent.id) {
             this.events.splice(i, 1)
          }
        }
         }
      

          this.selectedOpen = false;
          //this.$router.go();
      
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
  
        }
      },
  }
</script>

<style  scoped>

</style>


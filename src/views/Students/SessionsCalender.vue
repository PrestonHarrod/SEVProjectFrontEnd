<template>
  <v-row class="fill-height">
    <v-col>
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
 import SessionServices from "@/services/sessionServices.js"
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
      sessions: {},
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      month: '',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,

    }),
   
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
       else {
         this.color = "grey"
       }

       return this.color;
      },
    getTutorSlots() {
      console.log(this.events.length);
      this.user = Utils.getStore('user');

      SessionServices.getSessions()
      .then((response) => {
          this.sessions = response.data
      })
    },
    
    //  viewSession({ nativeEvent, event }) {
    //    console.log("here");
    //     const open = () => {
    //       this.selectedEvent = event
    //       console.log(event.id);
    //       this.selectedElement = nativeEvent.target
          
    //       requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
    //     }

    //     if (this.selectedOpen) {
    //       this.selectedOpen = false
    //       requestAnimationFrame(() => requestAnimationFrame(() => open()))
    //     } else {
    //       open()
    //     }
        
    //     nativeEvent.stopPropagation()
    //   },

    //   removeTimeSlot(selectedEvent) {
    //      if (confirm("Do you want to delete this time slot?")) {
    //     console.log(selectedEvent.id)
    //     TutorSlotServices.deleteTutorSlot(selectedEvent.id);
    //     for (let i = 0; i < this.events.length; i++) {
    //       if (this.events[i].id === selectedEvent.id) {
    //          this.events.splice(i, 1)
    //       }
    //     }
    //      }
      

    //       this.selectedOpen = false;
    //       //this.$router.go();
      
    //   },
      },
  }
</script>
<template>
  <v-app>
    <v-container fluid>
      <div>
        <H1 style="background-color: #811429; color: #f2f2f2">Availability</H1>
        <br />
        <v-row>
          <v-col> </v-col>
          <v-col> </v-col>
          <v-col> </v-col>
          <v-col>
            <v-btn v-on:click.prevent="createTutorSlots()" color="#811429" dark>
              Set Availability
            </v-btn>
          </v-col>
          <v-col> </v-col>
          <v-col> </v-col>
          <v-col> </v-col>
        </v-row>

        <v-row>
          <v-col v-for="day in days[0]" v-bind:key="day">
            <H2 style="background-color: #811429; color: #f2f2f2">{{
              day.day
            }}</H2>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="day in days[0]" v-bind:key="day">
            <v-combobox
              v-model="day.start"
              :items="items"
              label="Start Time"
            ></v-combobox>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="day in days[0]" v-bind:key="day">
            <v-combobox
              v-model="day.end"
              :items="items"
              label="End Time"
            ></v-combobox>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="day in days[0]" v-bind:key="day">
            <hr />
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="day in days[0]" v-bind:key="day">
            <v-btn v-if='day.start != "" && day.end != ""' icon v-on:click.prevent="addTimeSlot(day.day)">
              <v-icon>mdi-plus-box</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import Utils from "@/config/utils.js";
import tutorSlotServices from "@/services/tutorSlotServices.js";
//import UserServices from "@/services/UserServices.js";
// import Nav from '@/components/Nav.vue'

export default {
  data() {
    return {
      selected: [],
      user: {},
      search: "",
      items: [
        "1:00 AM",
        "2:00 AM",
        "3:00 AM",
        "4:00 AM",
        "5:00 AM",
        "6:00 AM",
        "7:00 AM",
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
        "7:00 PM",
        "8:00 PM",
        "9:00 PM",
        "10:00 PM",
        "11:00 PM",
        "12:00 AM",
      ],
      days: [ [
        {
          day: "Monday",
          start: "",
          end: "",
        },
        {
          day: "Tuesday",
          start: "",
          end: "",
        },
        {
          day: "Wednesday",
          start: "",
          end: "",
        },
        {
          day: "Thursday",
          start: "",
          end: "",
        },
        {
          day: "Friday",
          start: "",
          end: "",
        },
        {
          day: "Saturday",
          start: "",
          end: "",
        },
        {
          day: "Sunday",
          start: "",
          end: "",
        },
      ],
      ],
      grid: [],
    };    
  },
  async created() {
    this.user = Utils.getStore("user");
    console.log(this.user.userID);
    tutorSlotServices
      .getTutorSlotsForTutor(this.user.userID)
      .then((response) => {
        this.days[0].forEach((day) => {
          response.data.forEach((slot) => {
            if (day.day == slot.day) {
              let s = slot.startTime;
              let sHour = parseInt(s.substring(0, 2));
              let e = slot.endTime;
              let eHour = parseInt(e.substring(0, 2));

              s = this.getTimeStr(sHour, s);
              e = this.getTimeStr(eHour, e);

              day.start = s;
              day.end = e;
            }
          });
        });
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });

      this.grid.push([
        [
          "Start", "Start", "Start", "Start", "Start", "Start", "Start",
        ],
        [
          "End", "End", "End", "End", "End", "End", "End",
        ],
        [
          "Line", "Line", "Line", "Line", "Line", "Line", "Line",
        ],
        [
          "Add", "Add", "Add", "Add", "Add", "Add", "Add",
        ],
      ]);
  },

  methods: {
    createTutorSlots() {
      tutorSlotServices.deleteTutorSlotsForTutor(this.user.userID).then(() => {
        this.days[0].forEach((day) => {
          if (day.start != "" && day.end != "") {
            let tSlot = {};
            tSlot.tutorID = this.user.userID;
            tSlot.day = day.day;
            tSlot.startTime = this.formatTimeStr(day.start);
            tSlot.endTime = this.formatTimeStr(day.end);
            tutorSlotServices.addTutorSlot(tSlot);
          }
        });
      });
    },
    getTimeStr(hour, time) {
      if (hour > 12) {
        hour = hour - 12;
        time = hour + time.substring(2, 5) + " PM";
      } else {
        time = time.substring(0, 5) + " AM";
      }

      return time;
    },
    formatTimeStr(time) {
      let timeStr = "";
      if (time.substring(time.length - 2) == "AM") {
        timeStr = time.substring(0, 5) + ":00";
      } else {
        let hour = 0;
        if (time.indexOf(":") == 1) hour = parseInt(time.substring(0, 1));
        else hour = parseInt(time.substring(0, 2));
        timeStr = hour + 12 + ":" + time.substring(2, 5) + ":00";
      }
      return timeStr;
    },
    addTimeSlot(day) {
      let newSlot = {};
      newSlot.day = day;
      newSlot.start = "";
      newSlot.end = "";
      console.log(day);
    }
  },
};
</script>

<style>
H1 {
  text-align: center;
  font-size: 3.5rem !important;
}
th {
  text-align: left;
  font-size: 1.5rem !important;
}
</style>

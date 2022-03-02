<template>
<v-app>
  <v-container fluid >
    <div>
      <H1 style="background-color: #811429; color: #f2f2f2">Availability</H1>
        <br />
     
     <v-row>
       <v-col v-for="day in days" v-bind:key="day">
         <H2 style="background-color: #811429; color: #f2f2f2">{{day}}</H2>
       </v-col>
     </v-row>

     <v-row>
       <v-col v-for="day in days" v-bind:key="day">
          <v-combobox
          :items="items"
          label="Start Time"
        ></v-combobox>
       </v-col>
     </v-row>

    <v-row>
       <v-col v-for="day in days" v-bind:key="day">
         <v-combobox
          :items="items"
          label="End Time"
        ></v-combobox>
       </v-col>
     </v-row>

     
     
     
    </div>
  </v-container>
</v-app>
</template>

<script>
import Utils from "@/config/utils.js";
//import UserServices from "@/services/UserServices.js";
// import Nav from '@/components/Nav.vue'

export default {
  data() {
    return {
      selected: [],
      user: {},
      search: "",
      items: ["1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM",
              "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "7:00 PM", "8:00 PM", "9:00 PM",
              "10:00 PM", "11:00 PM", "12:00 AM"],
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    };
  },
  async created() {
    // display completed and upcoming sessions depending on
    // if a student or tutor is logged in
    this.user = Utils.getStore("user");
  },

  methods: {

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

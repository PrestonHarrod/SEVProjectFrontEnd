<template>
  <v-container>
    <div>
      <H1>Drop Ins</H1>
      <br />
      <v-card width="100vw">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search by First or Last Name"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-model="selected"
          show-select
          single-select
          :headers="headers"
          :items="DropIns"
          item-key="lname"
          :items-per-page="25"
          :search="search"
        >
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>

import DropInServices from "@/services/dropInServices.js";

export default {
  components: {},
  data() {
    return {
      selected: [],
      DropIn: {},
      search: "",
      headers: [
        {
          text: "First Name",
          align: "start",
          filterable: true,
          value: "fname",
        },
        {
          text: "Last Name",
          align: "start",
          filterable: true,
          value: "lname",
        },
        {
          text: "Email",
          align: "start",
          filterable: false,
          value: "email",
        },
        {
          text: "Date",
          align: "start",
          filterable: false,
          value: "date",
        },
          {
          text: "Student ID",
          align: "start",
          filterable: false,
          value: "studentIDNum",
        },
         {
          text: "Subject",
          align: "start",
          filterable: false,
          value: "subject",
        },
      ],
      DropIns: [{}],
    };
  },
  created() {
    //Grab all of the Drop Ins Created
    DropInServices.getDropIns()
      .then((response) => {
        this.DropIns = response.data;
      })

      .catch((error) => {
        console.log(error);
      });
  },
  methods: {

  },
};
</script>

<style>
</style>

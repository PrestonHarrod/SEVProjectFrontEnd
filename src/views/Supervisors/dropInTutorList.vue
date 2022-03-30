<template>
  <v-container fluid fill-height>
    <div>
      <H1 style="background-color: #1976d2; color: #f2f2f2">Drop Ins</H1>
      <br />
      <br />
      <h2>
      </h2>
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
          text: "date",
          align: "start",
          filterable: false,
          value: "date",
        },
          {
          text: "student ID Number",
          align: "start",
          filterable: false,
          value: "studentIDNum",
        },
         {
          text: "subject",
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
H1 {
  text-align: center;
  font-size: 3.5rem !important;
}
th {
  text-align: left;
  font-size: 1.5rem !important;
}
</style>

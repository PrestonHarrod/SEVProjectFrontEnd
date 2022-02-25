<template>
  <v-container fluid fill-height>
    <div>
      <H1 style="background-color: #0c76a0; color: #f2f2f2">Supervisors</H1>
      <br />
      <br />
      <h2>
        <v-btn
          :style="{ left: '50%', transform: 'translateX(-50%)' }"
          @click="goToAdd()"
          color="black"
          text
          rounded
          >Add Supervisor</v-btn
        >
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
          :items="supervisors"
          item-key="email"
          :items-per-page="25"
          :search="search"
          @click:row="viewSupervisor"
        >
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import Utils from "@/config/utils.js";
import UserServices from "@/services/UserServices.js";

export default {
  components: {},
  data() {
    return {
      selected: [],
      supervisor: {},
      search: "",
      headers: [
        {
          text: "First Name",
          align: "start",
          filterable: true,
          value: "fName",
        },
        {
          text: "Last Name",
          align: "start",
          filterable: true,
          value: "lName",
        },
        {
          text: "Email",
          align: "start",
          filterable: false,
          value: "email",
        },
      ],
      supervisors: [{}],
    };
  },
  created() {
    this.user = Utils.getStore("user");
    UserServices.getUsersByRole("2")
      .then((response) => {
        this.supervisors = response.data;
      })

      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    goToAdd() {
      this.$router
        .push({ name: "addSupervisor" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    viewSupervisor(supervisor) {
      let id = supervisor.userID;
      this.$router
        .push({ name: "viewSupervisor", params: { id: id } })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
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

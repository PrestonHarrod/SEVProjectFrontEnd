<template>
  <v-container fluid fill-height>
    <div>
      <H1 style="background-color: #0c76a0; color: #f2f2f2">Users</H1>
      <br />
      <br />
      <h2>
        <v-btn
          :style="{ left: '50%', transform: 'translateX(-50%)' }"
          @click="goToAdd()"
          color="black"
          text
          rounded
          >Add User</v-btn
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
          :items="users"
          item-key="email"
          :items-per-page="25"
          :search="search"
          @click:row="nothing"
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
      user: {},
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
      users: [{}],
    };
  },
  created() {
    this.user = Utils.getStore("user");
    UserServices.getUsers()
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    goToAdd() {
      // this.$router.push({ name: 'addUser'})
      // .then(() => {
      //     })
      //     .catch(error => {
      //      console.log(error)
      //     })
    },
    viewUser(/*some var*/) {
      //  let id = student.studentID
      //  if(this.user.advisorID != null || this.user.adminID)
      //       this.$router.push({ name: 'viewStudent', params: {id: id}})
      //     .then(() => {
      //     })
      //     .catch(error => {
      //      console.log(error)
      //     })
      // },
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

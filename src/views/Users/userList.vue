<template>
  <v-container>
    <div>
      <v-row>
      <v-combobox
        @input="changeOrgItem"
        v-model="orgItem"
        :items="orgItems"
        item-text="name"
        item-value="link"
        label="Organization Items"
      ></v-combobox>
    </v-row>
      <H1>Users</H1>
      <br />
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
        {
          text: "Phone Number",
          align: "start",
          filterable: false,
          value: "phoneNumber",
        },
      ],
      users: [{}],
      orgItems: [],
      orgItem: "",
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
      if(Utils.getStore("currentOrg") == 1)
        this.orgItems = [{name: "Users", link: "users"}, {name: "Students", link: "students"}, {name: "Tutors", link: "tutors"},
                     {name: "Mentees", link: "mentees"}, {name: "Locations", link: "locations"}, {name: "Subjects", link: "subjects"}];
      else
        this.orgItems = [{name: "Users", link: "users"}, {name: "Students", link: "students"}, {name: "Tutors", link: "tutors"},
                        {name: "Locations", link: "locations"}, {name: "Subjects", link: "subjects"}];
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
    changeOrgItem() {
      this.$router.push({ name: this.orgItem.link})
    }
  },
};
</script>

<style>
</style>

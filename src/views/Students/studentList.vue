<template>
  <v-container >
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
      <H1>Students</H1>
      <v-btn
      class='centered-btns'
          @click="goToAdd()"
          color="black"
          text
          rounded
          >Add Student</v-btn
        >
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
          :items="students"
          item-key="email"
          :items-per-page="25"
          :search="search"
          @click:row="viewStudent"
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
      student: {},
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
      students: [{}],
      orgItems: [],
      orgItem: "",
    };
  },
  created() {
    this.user = Utils.getStore("user");
    var currentOrg = Utils.getStore("currentOrg");
    UserServices.getUsersByRole("4", currentOrg)
      .then((response) => {
        this.students = response.data;
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
      this.$router
        .push({ name: "addStudent" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    viewStudent(student) {
      let id = student.userID;
      this.$router
        .push({ name: "viewStudent", params: { id: id } })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    changeOrgItem() {
      this.$router.push({ name: this.orgItem.link})
    }
  },
};
</script>

<style>

</style>

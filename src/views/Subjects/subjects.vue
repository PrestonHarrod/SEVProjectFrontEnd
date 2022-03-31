<template>
  <v-container fluid fill-height>
    <div>
      <H1 style="background-color: #1976d2; color: #f2f2f2">Subjects</H1>
      <br />
      <br />
      <h2>
        <v-btn
          :style="{ left: '50%', transform: 'translateX(-50%)' }"
          @click="goToAdd()"
          color="black"
          text
          rounded
          >Add Subject</v-btn
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
          :items="subjects"
          item-key="building"
          :items-per-page="25"
          :search="search"
          @click:row="viewSubject"
        >
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import Utils from "@/config/utils.js";
import SubjectServices from "@/services/subjectServices.js";
export default {
  components: {},
  data() {
    return {
      selected: [],
      Subject: {},
      search: "",
      headers: [
        {
          text: "level",
          align: "start",
          filterable: true,
          value: "level",
        },
        {
          text: "Genre",
          align: "start",
          filterable: true,
          value: "subjectGenre",
        },
        {
          text: "Name",
          align: "start",
          filterable: false,
          value: "name",
        },
        {
          text: "Teacher",
          align: "start",
          filterable: false,
          value: "teacher",
        },
      ],
      subjects: [{}],
    };
  },
  created() {
    this.user = Utils.getStore("user");
    SubjectServices.getSubjects()
      .then((response) => {
        this.subjects = response.data;
      })

      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    goToAdd() {
      this.$router
        .push({ name: "addSubject" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    viewSubject(subject) {
      let id = subject.subjectID;
      console.log(id);
      this.$router
        .push({ name: "viewSubject", params: { id: id } })
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

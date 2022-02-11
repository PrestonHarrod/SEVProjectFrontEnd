<template>
  <v-container fluid fill-height>
      <v-row>
      <v-col>
      <H1 style="background-color: #811429; color: #f2f2f2">Manage Subjects</H1>
      </v-col>
      </v-row>
      <v-row>
      <v-col>
      <H2 style="background-color: #811429; color: #f2f2f2"> My Subjects  </H2>
      </v-col>
      </v-row>
      <br />
      <div v-for="subject in tutorSubjects" v-bind:key="subject.subjectID">
        <v-btn v-on:click.prevent="addToSubjects(subjects, tutorSubjects, subject)" rounded color="#811429" dark> {{subject.name}} <v-icon>mdi-close-circle-outline</v-icon> </v-btn>
      </div>
      <br />
      <br />
      <!--<v-card width="100vw">
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
          :headers="headers"
          :items="subjects"
          item-key="subjectID"
          :items-per-page="25"
          show-select
          :search="search"
        >
        </v-data-table>
      </v-card>-
      <v-btn
        :style="{ transform: 'translateX(-50%)' }"
        v-on:click.prevent="log()"
        text
        rounded
        >Submit</v-btn>-->

    <br />
    <v-row>
    <v-col>
    <H2 style="background-color: #811429; color: #f2f2f2"> Subjects </H2>
    </v-col>
    </v-row>
    <br />
    <br />
    <div v-for="subject in subjects" v-bind:key="subject.subjectID">
        <v-btn v-on:click.prevent="addToSubjects(tutorSubjects, subjects, subject)" rounded color="#811429" dark> {{subject.name}}  </v-btn>
    </div>
  </v-container>
</template>

<script>
import subjectServices from "@/services/subjectServices.js";
export default {
  components: {},
  data() {
    return {
      users: {},
      search: "",
      headers: [
        {
          text: "Subject ID",
          align: "start",
          filterable: false,
          value: "subjectID",
        },
        {
          text: "Subject Name",
          align: "start",
          filterable: true,
          value: "name",
        },
        {
          text: "Add Subject",
          align: "start",
          filterable: true,
        },
      ],
      subjects: [{}],
      tutorSubjects: [],
      selected: [],
    };
  },
  created() {
    subjectServices
      .getSubjects()
      .then((response) => {
        this.subjects = response.data;
      })
      .catch((error) => {
        console.log(error);
        alert("ERROR: Retrieve subjects failed.");
      });
  },
  methods: {
    log() {
      console.log(this.selected);
    },
    addToSubjects(arr, arr2, subject)
    {
        arr.push(subject);
        arr2.splice(arr2.indexOf(subject), 1);
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

<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col>
        <H1 style="background-color: #1976d2; color: #f2f2f2"
          >Manage Subjects</H1
        >
        <br />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <H2 style="background-color: #1976d2; color: #f2f2f2"> My Subjects </H2>
      </v-col>
    </v-row>
    <br />
    <div v-for="subject in mySubjects" v-bind:key="subject.id">
      <v-btn
        v-on:click.prevent="moveToSubjects(subjects, mySubjects, subject)"
        rounded
        color="#1976d2"
        dark
      >
        {{ subject.name }} <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </div>
    <br />
    <br />
    <br />
    <v-row>
      <v-col>
        <H2 style="background-color: #1976d2; color: #f2f2f2"> Subjects </H2>
      </v-col>
    </v-row>
    <br />
    <br />
    <div v-for="subject in subjects" v-bind:key="subject.subjectID">
      <v-btn
        v-on:click.prevent="moveToMySubjects(mySubjects, subjects, subject)"
        rounded
        color="#1976d2"
        dark
      >
        {{ subject.name }}
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import Utils from "@/config/utils.js";
//import UserServices from "@/services/UserServices.js"
import subjectServices from "@/services/subjectServices.js";
import tutorSubjectServices from "@/services/tutorSubjectServices";

export default {
  components: {},
  data() {
    return {
      user: {},
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
      subjects: [],
      tutorSubjects: [],
      mySubjects: [],
      selected: [],
    };
  },
  created() {
    this.user = Utils.getStore("user");
    console.log(this.user.userID);
    subjectServices
      .getSubjects()
      .then((response) => {
        this.subjects = response.data;
      })
      .catch((error) => {
        console.log(error);
        alert("ERROR: Retrieve subjects failed.");
      });

    tutorSubjectServices
      .getTutorSubjectsForTutor(this.user.userID)
      .then((response) => {
        response.data.forEach((element) =>
          subjectServices
            .getSubject(element.subjectID)
            .then((r) => {
              this.mySubjects.push(r.data);
              for (let i = 0; i < this.subjects.length; i++)
                if (
                  this.subjects[i].subjectID ==
                  this.mySubjects[this.mySubjects.length - 1].subjectID
                )
                  this.subjects.splice(i, 1);
            })
            .catch((error) => {
              console.log(error);
              alert("ERROR: Retrieve subjects failed.");
            })
        );
      })
      .catch((error) => {
        console.log(error);
        alert("ERROR: Retrieve subjects failed.");
      });
    console.log("hello hello " + this.tutorSubjects);
  },
  methods: {
    log() {
      console.log(this.selected);
    },
    moveToMySubjects(arr, arr2, subject) {
      console.log(subject);
      let tSub = {};
      tSub.tutorID = this.user.userID;
      tSub.subjectID = subject.subjectID;
      console.log(tSub);
      tutorSubjectServices.addTutorSubject(tSub).catch((error) => {
        console.log(error);
        alert("ERROR: Retrieve subjects failed.");
      });
      arr.push(subject);
      arr2.splice(arr2.indexOf(subject), 1);
    },
    moveToSubjects(arr, arr2, subject) {
      tutorSubjectServices
        .deleteSpecificTutorSubject(this.user.userID, subject.subjectID)
        .catch((error) => {
          console.log(error);
          alert("ERROR: Retrieve subjects failed.");
        });
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

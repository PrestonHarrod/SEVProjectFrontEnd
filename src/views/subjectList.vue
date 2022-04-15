<template>
  <v-container>
    <v-row>
      <v-col>
        <H1>Manage Subjects for Tutor</H1>
      </v-col>
    </v-row>
    <v-row>
      <v-combobox
        @input="changeTutorSubjects"
        v-model="tutor"
        :items="tutorList"
        item-text="name"
        item-value="userID"
        label="Tutors"
      ></v-combobox>
    </v-row>
    <v-row>
      <v-col v-if="tutor.userID != null">
        <H2> {{tutor.name}}'s Subjects </H2>
      </v-col>
      <v-col v-else>
        <H2> Tutor Subjects </H2>
      </v-col>
    </v-row>
    <div  v-for="subject in mySubjects" v-bind:key="subject.id">
      <v-btn v-if="tutor.userID != null"
        class="centered-btns"
        v-on:click.prevent="moveToSubjects(subjects, mySubjects, subject)"
        rounded
        color="#247b7b"
        dark
      >
        {{ subject.name }} <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </div>

    <v-row>
      <v-col>
        <H2> Subjects </H2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedSubject"
          :items="subjectItems"
          label="Subjects"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="selectedLevel"
          :items="levelItems"
          item-value="levelID"
          label="Level"
        ></v-select>
      </v-col>
    </v-row>

    <div v-for="subject in subjects" v-bind:key="subject.subjectID">
      <v-btn 
        v-if="
          (selectedLevel == '' ||
            selectedLevel == 'Any Level' ||
            subject.level == selectedLevel) &&
          (selectedSubject == '' ||
            selectedSubject == 'Any Subject' ||
            subject.subjectGenre == selectedSubject)
          && tutor.userID != null
        "
        v-on:click.prevent="moveToMySubjects(mySubjects, subjects, subject)"
        rounded
        color="#247b7b"
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
import tutorSubjectServices from "@/services/tutorSubjectServices.js";
import userServices from "@/services/UserServices.js";

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
      levelItems: ["Any Level", "1000", "2000", "3000", "4000", "5000"],
      selectedLevel: [],
      subjectItems: [
        "Any Subject",
        "Math",
        "English",
        "Computer Science",
        "Engineering",
        "Bible",
        "Biology",
        "Nursing",
      ],
      selectedSubject: [],
      tutorList: [],
      tutor: "",
    };
  },
  created() {
    console.log("Org ID: " + Utils.getStore("currentOrg"));
    this.user = Utils.getStore("user");
    console.log(this.user.userID);
    userServices.getUsersByRole(3, Utils.getStore("currentOrg")).then((tutors) => {
      tutors.data.forEach(tutor => {
        tutor.name = tutor.fName + " " + tutor.lName;
        this.tutorList.push(tutor);
      });
      
      
    });
  },
  methods: {
    log() {
      console.log(this.selected);
    },
    moveToMySubjects(arr, arr2, subject) {
      //console.log(subject);
      let tSub = {};
      tSub.tutorID = this.tutor.userID;
      tSub.subjectID = subject.subjectID;
      //console.log(tSub);
      tutorSubjectServices.addTutorSubject(tSub).catch((error) => {
        console.log(error);
        alert("ERROR: Retrieve subjects failed.");
      });
      arr.push(subject);
      arr2.splice(arr2.indexOf(subject), 1);
    },
    moveToSubjects(arr, arr2, subject) {
      tutorSubjectServices
        .deleteSpecificTutorSubject(this.tutor.userID, subject.subjectID)
        .catch((error) => {
          console.log(error);
          alert("ERROR: Retrieve subjects failed.");
        });
      arr.push(subject);
      arr2.splice(arr2.indexOf(subject), 1);
    },
    changeTutorSubjects() {
      this.subjects = [];
      this.mySubjects = [];
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
      .getTutorSubjectsForTutor(this.tutor.userID)
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
    },
  },
};
</script>

<style>
</style>

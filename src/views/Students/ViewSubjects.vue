<template>
  <v-container>
    <div>
      <H1 style="background-color: #811429; color: #f2f2f2"
        >Schedule Session</H1
      >
      <br />
      <v-app>
        <v-form>
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                v-model="subject"
                :items="subjects"
                label="Subject List"
                item-text="name"
                item-value="name"
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <!-- <v-select 
          :items="users"
          label="Course Level"
          item-text="fName"
          item-value="fName"
          dense
          outlined
          v-model="subject"
        ></v-select> -->
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <!-- <h2><v-btn color="#66BB6A" @click="findTutor(subjects.subjectID, level)">Submit</v-btn></h2> -->
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div>
                <v-card width="100vw">
                  <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="users"
                    item-key="userID"
                    :items-per-page="25"
                    single-select
                    show-select
                    :search="subject"
                    class="elevation-1"
                  >
                  </v-data-table>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-app>
    </div>
  </v-container>
</template>

<script>
import subjectServices from "@/services/subjectServices.js";
import userServices from "@/services/UserServices.js";
import tutorSubjectServices from "@/services/tutorSubjectServices.js";
export default {
  data() {
    return {
      search: "",
      selected: [],
      subjects: [],
      subject: [],
      tutorSubjects: [{}],
      levels: ["Math", 2, 3, 4],
      level: "",
      headers: [
        {
          text: "First Name",
          align: "start",
          filterable: true,
          sortable: true,
          value: "fName",
        },
        {
          text: "Last Name",
          align: "start",
          filterable: true,
          sortable: true,
          value: "lName",
        },
        {
          text: "Subjects Tutored",
          align: "start",
          filterable: true,
          sortable: true,
          value: "tutorSubject.subject.name",
        },
      ],
      users: [{}],
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
      });
    userServices
      .getTutorSubjects("3")
      .then((response) => {
        this.users = response.data;
      })

      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    findTutor(subjectID, level) {
      console.log(subjectID);
      console.log(level);
    },
  },

  getTutorSubjectsForTutor(id) {
    tutorSubjectServices
      .getTutorSubjects(id)
      .then((response) => {
        this.tutorSubjects = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

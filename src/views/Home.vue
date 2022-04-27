<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="10" sm="2">
            <v-sheet rounded="lg" min-height="268">
              Upcoming Sessions
              <v-simple-table dense="true">
                <template v-slot:default>
                  <thead></thead>
                  <tbody>
                    <tr v-for="session in sessions" :key="session.sessionID">
                      <td>{{ session.scheduledStart }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-sheet>
          </v-col>
          
          <v-col cols="12" sm="8">
            
            <v-sheet min-height="70vh" rounded="lg">
              
              <div style="display: inline-block">
                Welcome, {{ this.user.user }}!
              <v-radio-group v-on:change="populateFunctions" row v-model="functionGroup">
                <v-radio v-if="getAuth(3)"
                  label="Student"
                  value="Student"
                  color="#811429"
                >
                </v-radio>
                <v-radio v-if="getAuth(3)"
                  label="Tutor"
                  value="Tutor"
                  color="#811429"
                >
                </v-radio>
                <v-radio v-if="getAuth(2)"
                  label="Supervisor"
                  value="Supervisor"
                  color="#811429"
                >
                </v-radio>
              </v-radio-group>
            </div>
              <v-container>
                <v-row v-for="r in functions" :key="r" :align="start" no-gutters style="height: 160px">
                  <v-col v-for="c in r" :key="c.name" style="margin: 5px">
                    <v-card v-on:click.prevent="goToPage(c.link)" v-if="c.name != ''" style="background-color: #811429; color: white; height: 150px; font-weight: bold; font-size: 30px; padding: 30px;"  outlined tile>
                      {{ c.name }}
                    </v-card> 
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              Pending Sessions
              <v-simple-table dense="true">
                <template v-slot:default>
                  <thead></thead>
                  <tbody>
                    <tr
                      v-for="session in pendingsessions"
                      :key="session.sessionID"
                    >
                      <td>{{ session.scheduledStart }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Utils from "@/config/utils.js";
import SessionServices from "@/services/sessionServices.js";

export default {
  data: () => ({
    userFunctions: ["Student", "Tutor", "Supervisor"],
    functions: [],
    user: {},
    session: {},
    sessions: [],
    pendingsessions: [],
    i: null,
    functionGroup: "",
    alignments: [
        'start',
        'center',
        'end',
      ],
  }),
  created() {
    this.user = Utils.getStore("user");
    console.log(this.user);
    let r = "";
    if(this.getAuth(2))
      r = "Supervisor";
    else if(this.getAuth(3))
      r = "Tutor";
    else  
      r = "Student";
    this.functionGroup = r;
    this.populateFunctions();
    SessionServices.getSessions().then((response) => {
      for (this.i = 0; this.i < response.data.length; this.i++) {
        console.log(response.data.length);
        if (this.user.userID == response.data[this.i].studentID) {
          if (response.data[this.i].status === "Upcoming") {
            this.session = response.data[this.i];
            this.sessions.push(this.session);
          }
        }
        if (
          this.user.userID == response.data[this.i].studentID ||
          this.user.userID == response.data[this.i].tutorID
        ) {
          if (response.data[this.i].status === "Pending") {
            this.session = response.data[this.i];
            this.pendingsessions.push(this.session);
          }
        }
      }
      console.log(response.data);
      console.log(this.sessions);
      console.log(this.pendingsessions);
    });
  },
  methods: {
    goToSchedule() {
      this.$router.push({ name: "sessionsCalender" });
    },
    goToPickTutor() {
      this.$router.push({ name: "studentSubjectView" });
    },
    getAuth(num) {
      console.log("roles: " + this.user.roles);
      console.log("orgs: " + this.user.orgs);
      return this.user.roles.includes(num); //return if it includes the role responsible
    },
    populateFunctions() {
      if(this.functionGroup == "Supervisor") {
        if(Utils.getStore("currentOrg") == 1) {
          this.functions = [ [{name: "Manage Organization", link: "users"}, {name: "Drop-In Tutoring", link: "dropInTutoring",}, {name: "Sessions", link: "supervisorSessions"}],
                             [{name: "Tutor Subjects", link: "subject"}, {name: "Requests", link: "requests"}, {name: "Edit Account", link: "userprofile"}],
                             [{name: "", link: 6}, {name: "Logout", link: "login"}, {name: "", link: 8}] ]; 
        }
        else {
          this.functions = [ [{name: "Manage Organization", link: "users"}, {name: "Sessions", link: "supervisorSessions"}, {name: "Tutor Subjects", link: "subject"}],
                           [{name: "Requests", link: "requests"}, {name: "Edit Account", link: "userprofile"}, {name: "Logout", link: "login"}],
                           [{name: "", link: 6}, {name: "", link: 7}, {name: "", link: 8}] ]; 
        }
      }
      else if(this.functionGroup == "Tutor") {
        this.functions = [ [{name: "Sessions", link: "schedule"}, {name: "Edit Account", link: "userprofile"}, {name: "Logout", link: "login"}],
                           [{name: "", link: 6}, {name: "", link: 6}, {name: "", link: 6}],
                           [{name: "", link: 6}, {name: "", link: 6}, {name: "", link: 6}] ]; 
      }
      else {
        this.functions = [ [{name: "Sessions", link: "sessionsCalender"}, {name: "Schedule Session", link: "studentSubjectView"}, {name: "Edit Account", link: "userprofile"}],
                           [{name: "", link: 6}, {name: "Logout", link: "login"}, {name: "", link: 6}],
                           [{name: "", link: 6}, {name: "", link: 6}, {name: "", link: 6}] ];  
      }
    },
    goToPage(link) {
    this.$router.push({ name: link });
  }
  },
  
};
</script>

<style scoped>
</style>
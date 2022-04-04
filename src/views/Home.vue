<template>
  <v-app id="inspire">
    
    
    <v-main class="grey lighten-3">
      <v-container>
        
        <v-row >
          <v-col
            cols="10"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
            Upcoming Sessions
            <v-simple-table dense=true>
              <template v-slot:default>
                <thead>
                  
                </thead>
                <tbody>
                  <tr
                    v-for="session in sessions"
                    :key="session.sessionID"
                  >
                    <td>{{ session.scheduledStart }}</td>
                    
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
              
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
          >

            <v-sheet
              min-height="70vh"
              rounded="lg"
              
            >
           
            Welcome, {{this.user.user}}!
            <v-btn v-if="getAuth(4)"
            large=true
            class="d-flex flex-column"  
            color="primary"
            @click="goToPickTutor()"
            :style="{left: '35%', transform:'translateY(+200%)'}"
            >
               Find A Tutor
            </v-btn>
            
            <p v-if="getAuth(4)"
            
            :style="{left: '35%', transform:'translateY(+1100%)'}"
            class="font-weight-bold">
              OR
            </p>
            <v-btn v-if="getAuth(4)"
            large=true
            class="d-flex flex-column"  
            color="primary"
            @click="goToSchedule()"
            :style="{left: '26%', transform:'translateY(+760%)'}"
            >
               See Your Upcoming Sessions
            </v-btn>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              Pending Sessions
              <v-simple-table dense=true>
              <template v-slot:default>
                <thead>
                  
                </thead>
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
import SessionServices from "@/services/sessionServices.js"

  export default {
    data: () => ({
      user: {},
      session: {},
      sessions: [],
      pendingsessions: [],
      i: null
    }),
    created() {
      this.user = Utils.getStore("user")
      console.log(this.user)
      SessionServices.getSessions()
      .then((response) => {
          for (this.i = 0; this.i < response.data.length; this.i++) {
            console.log(response.data.length)
          if (this.user.userID == response.data[this.i].studentID) {
            if (response.data[this.i].status === "Upcoming") {
              this.session = response.data[this.i]
              this.sessions.push(this.session)
            }
          }
          if (this.user.userID == response.data[this.i].studentID || this.user.userID == response.data[this.i].tutorID) {
            if (response.data[this.i].status === "Pending") {
              this.session = response.data[this.i]
              this.pendingsessions.push(this.session)
            }
          }
        }
        console.log(response.data)
        console.log(this.sessions)
        console.log(this.pendingsessions)
      })
    },
    methods: {
      goToSchedule() {
        this.$router.push({name: 'sessionsCalender'})
      },
      goToPickTutor() {
        this.$router.push({name: 'studentSubjectView'})
      },
      getAuth(num) {
      console.log("roles: " + this.user.roles);
      console.log("orgs: " + this.user.orgs);
      return this.user.roles.includes(num); //return if it includes the role responsible
    },
    }
  }
</script>
<template>

  <v-container>
     <H1 style="background-color: #1976d2; color: #f2f2f2"
      >Become a Tutor</H1
    >
    <div>
      <br />
      <v-app>
        <v-form>
          <v-row>
            <v-col class="d-flex" cols="12" sm="6"> </v-col>
          </v-row>
          <v-row>
            <v-col>
            </v-col>
          </v-row>
          <v-row>
          </v-row>
          <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
          <br />
          <p class="text-left">
           {{message}}
           <br>
           {{message2}}
           <br>
            {{message3}}
           <br>
           {{message4}}
           <br>
            {{message5}}
            </p>
          <v-textarea
              color="teal"
              v-model="desc"
            >
            <template v-slot:label>
                <div>
                </div>
              </template>
              
            </v-textarea>
            <v-radio-group v-model="selectedOrg" column>
            <v-radio label="Student Success" color="red" value="1"></v-radio>
            <v-radio label="Writing Center" color="red darken-3" value="2"></v-radio>
            <v-radio label="New College" color="indigo" value="3"></v-radio>
         </v-radio-group>
            <v-btn class='centered-btns' @click="createRequest()" color="primary">
               Submit
            </v-btn>
        </v-form>
      </v-app>
    </div>
  </v-container>
</template>

<script>
import Utils from '@/config/utils.js';
import requestServices from "@/services/requestServices.js"
export default {
   data() {
      return {
         requestTypes: ["I'm looking for a class that doesn't exist",
                        "No tutors are avalible",
                        "No open slots fit my schedule",
                        "Other"],
         request: "",
         desc: "",
         submitRequest: {},
         selected: {},
         selectedOrg: {},
         user: {},
         usersOrg: [{}],
         message: "Tell us about yourself.",
         message2: "Include:",
         message3: "  - Academic Level",
         message4: "  - GPA",
         message5: "  - Major",

      };
   },
   async created() {
      this.user = Utils.getStore('user');
   },
   methods: {
      // create request based off users input
      createRequest() {
         this.submitRequest.userID = this.user.userID;
         this.submitRequest.type = "Becoming a tutor";
         this.submitRequest.desc = this.desc;
         this.submitRequest.orgID = this.selectedOrg;
         this.submitRequest.studentID = this.user.userID
         console.log(this.submitRequest)

         requestServices.addRequest(this.submitRequest)
         this.$router.push({ name: "/" });
      
      }
   }
}
</script>

<style>
p {
    /* align: left */
}
</style>
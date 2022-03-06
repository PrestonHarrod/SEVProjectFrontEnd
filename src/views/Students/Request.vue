<template>
  <v-container>
    <div>
      <br />
      <v-app>
        <v-form>
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                v-model="selected"
                :items="requestTypes"
                item-value="request"
                label="Contact Subject"
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
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
          <v-textarea
              color="teal"
              v-model="desc"
            >
            <template v-slot:label>
                <div>
                  Description
                </div>
              </template>
              
            </v-textarea>
            <v-btn @click="createRequest()" color="primary">
               Submit
            </v-btn>
        </v-form>
      </v-app>
    </div>
  </v-container>
</template>

<script>
import Utils from '@/config/utils.js';
import userOrgServices from '@/services/userOrgServices.js'

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
         selected: [],
         user: {},
         usersOrg: [{}]
      };

   },
   async created() {
      this.user = Utils.getStore('user');
       userOrgServices.getUsersOrgID(this.user.userID)
      .then((response) => {
         this.usersOrg = response.data;
      });


      



   },
   methods: {
      createRequest() {
         this.submitRequest.userID = this.user.userID;
         this.submitRequest.type = this.request;
         this.submitRequest.desc = this.desc;
         this.submitRequest.userID = this.user.userID
         //this.submitRequest.orgID = 
      }
   }
}

</script>

<style>
</style>

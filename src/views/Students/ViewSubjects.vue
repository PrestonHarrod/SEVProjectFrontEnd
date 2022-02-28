<template>
  <v-container>
    <div>
      <H1 style="background-color: #1976d2; color: #f2f2f2"
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
import userOrgServices from "@/services/userOrgServices.js";
import Utils from '@/config/utils.js';
export default {
  data() {
    return {
      search: "",
      selected: [],
      subjects: [],
      subject: "",
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
      usersOrg: [{}],
      usersOrgID: 0,
    };
  },


 async created() {
    this.user = Utils.getStore('user');
    let id = this.user.userID;
      // function to get users org
    userOrgServices.getUsersOrgID(id)
    .then((response) => {
        this.usersOrg = response.data;
        for( let i = 0; i < response.data.length; i++) {
        this.usersOrgID = this.usersOrg[i].orgID;
         userServices.getTutors("3", this.usersOrgID)
          .then((response) => {
            this.users = response.data;
         })
          .catch((error) => {
          console.log(error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });


      await subjectServices
      .getSubjects()
      .then((response) => {
        this.subjects = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
 }};
</script>

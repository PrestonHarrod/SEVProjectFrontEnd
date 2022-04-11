<template>

  <v-container>
     <H1
      >Give Feedback</H1
    >
    <div>
      <br />
      <v-app>
        <v-form>
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
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
          <v-rating
            v-model="rating"
            background-color="red "
            color="blue"
            large
            @input="getRating()"
          ></v-rating>

          <v-radio-group v-model="question1" column>
             Did your tutor work with you to identify the topics that would be covered in the session?
            <v-radio label="Yes" color="red" value="1"></v-radio>
            <v-radio label="No" color="red darken-3" value="2"></v-radio>
         </v-radio-group>
         <v-radio-group v-model="question2" column>
             Was your tutor on time?
            <v-radio label="Yes" color="red" value="1"></v-radio>
            <v-radio label="No" color="red darken-3" value="2"></v-radio>
         </v-radio-group>
         <v-radio-group v-model="question3" column>
             How knowledgeable was the tutor on the subjects discussed?
            <v-radio label="Outstanding, very knowledgeable" color="red" value="1"></v-radio>
            <v-radio label="Good, knows most of the material" color="red darken-3" value="2"></v-radio>
            <v-radio label="Poor, does not know material" color="red darken-3" value="3"></v-radio>
         </v-radio-group>
         <v-radio-group v-model="question4" column>
             How well was your tutor able to explain the material?
            <v-radio label="Outstanding, it was explain very well" color="red" value="1"></v-radio>
            <v-radio label="Good, but I still had questions" color="red darken-3" value="2"></v-radio>
            <v-radio label="Poor, I did not learn much" color="red darken-3" value="3"></v-radio>
         </v-radio-group>
          <v-textarea
              color="teal"
              v-model="desc"
            >
            <template v-slot:label>
                <div>
                  Was your tutor knowledgeable on the topic(s) discussed?
                </div>
              </template>
              
            </v-textarea>
            
            <v-btn class='centered-btns' v-if="rating != 0" @click="sendFeedback()" color="primary">
               Submit
            </v-btn>
        </v-form>
      </v-app>
    </div>
  </v-container>
</template>

<script>
import Utils from "@/config/utils.js"
import SessionServices from "@/services/sessionServices.js"

export default {
  props: ["id"],
  data:  () => ({
    sessionID: null,
    user: {},
    session: {},
    rating: 0,
    desc: "",

  }),
  created() {
    this.user = Utils.getStore("user")
    SessionServices.getSession(this.id)
    .then(response => {
      this.sessionID = this.id
      this.session = response.data;
    })
    console.log(this.session)
  },
  methods: {
    getRating() {
      console.log(this.rating)
    },
    sendFeedback() {
    this.session.feedback = this.desc
    this.session.rating = this.rating
    SessionServices.updateSession(this.session)
    console.log(this.session)
    this.$router.push({name: "sessionsCalender"})
  }

  },
}

</script>
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
            color="red"
            large
            @input="getRating()"
          ></v-rating>

          <v-radio-group v-model="question1" column>
             Did your tutor work with you to identify the topics that would be covered in the session?
            <v-radio label="Yes" color="red" value="Yes"></v-radio>
            <v-radio label="No" color="red darken-3" value="No"></v-radio>
         </v-radio-group>
         <v-radio-group v-model="question2" column>
             Was your tutor on time?
            <v-radio label="Yes" color="red" value="Yes"></v-radio>
            <v-radio label="No" color="red darken-3" value="No"></v-radio>
         </v-radio-group>
         <v-radio-group v-model="question3" column>
             How knowledgeable was the tutor on the subjects discussed?
            <v-radio label="Outstanding: very knowledgeable" color="red" value="Outstanding: very knowledgeable"></v-radio>
            <v-radio label="Good: knows most of the material" color="red darken-3" value="Good: knows most of the material"></v-radio>
            <v-radio label="Poor: does not know material" color="red darken-3" value="Poor: does not know material"></v-radio>
         </v-radio-group>
         <v-radio-group v-model="question4" column>
             How well was your tutor able to explain the material?
            <v-radio label="Outstanding: it was explain very well" color="red" value="Outstanding: it was explain very well"></v-radio>
            <v-radio label="Good: but I still had questions" color="red darken-3" value="Good: but I still had questions"></v-radio>
            <v-radio label="Poor: I did not learn much" color="red darken-3" value="Poor, I did not learn much"></v-radio>
         </v-radio-group>
         <v-radio-group v-model="question5" column>
             Did your tutor ask you questions to make sure you understood and could explain the topics discussed?
            <v-radio label="Yes" color="red" value="Yes"></v-radio>
            <v-radio label="No" color="red darken-3" value="No"></v-radio>
         </v-radio-group>
         <v-radio-group v-model="question6" column>
             How did the tutor treat you?
            <v-radio label="Outstanding: I knew the tutor cared about my success" color="red" value="Outstanding: I knew the tutor cared about my success"></v-radio>
            <v-radio label="Good: the tutor was professional" color="red darken-3" value="Good: the tutor was professional"></v-radio>
            <v-radio label="Poor: the tutor was rude" color="red darken-3" value="Poor: the tutor was rude"></v-radio>
         </v-radio-group>
         <v-radio-group v-model="question7" column>
             What impact do you anticipate tutoring will have on your performance in this course?
            <v-radio label="Significant: I better understand course concepts and expectations" color="red" value="Significant: I better understand course concepts and expectations"></v-radio>
            <v-radio label="Minor: It has helped some." color="red darken-3" value="Minor: It has helped some."></v-radio>
            <v-radio label="No improvement: The tutoring did not benefit me at all" color="red darken-3" value="No improvement: The tutoring did not benefit me at all"></v-radio>
         </v-radio-group>
         <v-radio-group v-model="question8" column>
             Would you recommend this tutor to other students?
            <v-radio label="Yes" color="red" value="Yes"></v-radio>
            <v-radio label="No" color="red darken-3" value="No"></v-radio>
         </v-radio-group>
          <v-textarea
              color="teal"
              v-model="desc"
            >
            <template v-slot:label>
                <div>
                  Please provide any additional comments here:
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
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
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
      let str = ""
      str = str + "Did your tutor work with you to identify the topics that would be covered in the session? "  + this.question1  + "\n "
      str = str + "Was your tutor on time? " + this.question2  + "\n "
      str = str + "How knowledgeable was the tutor on the subjects discussed? " + this.question3  + "\n "
      str = str + "How well was your tutor able to explain the material? " + this.question4  + "\n "
      str = str + "Did your tutor ask you questions to make sure you understood and could explain the topics discussed? " + this.question5  + "\n "
      str = str + "How did the tutor treat you? " + this.question6  + "\n "
      str = str + "What impact do you anticipate tutoring will have on your performance in this course? " + this.question7 + "\n "
      str = str + "Would you recommend this tutor to other students? " + this.question8  + "\n "
      str = str + "Please provide any additional comments here:" + this.desc

      console.log(str)
    this.session.feedback = str
    this.session.rating = this.rating
    SessionServices.updateSession(this.session)
    console.log(this.session)
    this.$router.push({name: "sessionsCalender"})
  }

  },
}

</script>
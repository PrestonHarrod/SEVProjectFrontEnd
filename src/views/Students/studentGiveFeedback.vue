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
            background-color="blue lighten-3"
            color="blue"
            large
            @input="getRating()"
          ></v-rating>
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
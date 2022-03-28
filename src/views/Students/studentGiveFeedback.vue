<template>

  <v-container>
     <H1 style="background-color: #1976d2; color: #f2f2f2"
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
          <v-textarea
              color="teal"
              v-model="desc"
            >
            <template v-slot:label>
                <div>
                  Description
                </div>
              </template>
              <v-rating
                empty-icon="$mdiStarOutline"
                full-icon="$mdiStar"
                half-icon="$mdiStarHalfFull"
                hover
                length="5"
                size="64"
                value="3"
            ></v-rating>
              
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
import Utils from "@/config/utils.js"
import SessionServices from "@/services/sessionServices.js"

export default {
  props: ["id"],
  data:  () => ({
    user: {},
    session: {},

  }),
  created() {
    this.user = Utils.getStore("user")
    SessionServices.getSession(this.id)
    .then(response => {
      this.session = response.data;
    })
    console.log(this.session)
  }
}

</script>
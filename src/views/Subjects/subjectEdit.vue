<template>
  <div>
    <H1>Subject Edit</H1>
    <v-app>
      <v-form>
        <v-col>
          <v-text-field
            label="level"
            placeholder="1000"
            v-model="subject.level"
            type="text"
            id="level"
          />
          <v-text-field
            label="Subject Area"
            placeholder="101"
            v-model="subject.subjectGenre"
            type="text"
            id="subjectGenre"
          />
          <v-text-field
            label="name"
            placeholder="Math Functions and Modelling"
            v-model="subject.name"
            type="text"
            id="name"
          />
          <v-text-field
            label="teacher"
            placeholder="Professor North"
            v-model="subject.teacher"
            type="text"
            id="teacher"
          />
        </v-col>
        <v-btn
        class='centered-btns'
          v-on:click.prevent="updateSubject()"
          text
          rounded
          >Submit</v-btn
        >
        <v-btn
        class='centered-btns'
          v-on:click.prevent="cancel()"
          color="black"
          text
          rounded
          >Cancel</v-btn
        >
      </v-form>
    </v-app>
  </div>
</template>
<script>
import SubjectServices from "@/services/subjectServices.js";
import Utils from "@/config/utils.js";
export default {
  props: ["id"],
  components: {},
  data() {
    return {
      user: {},
      subject: {},
      menu: false,
    };
  },
  created() {
    this.user = Utils.getStore("user");
    SubjectServices.getSubject(this.id)
      .then((response) => {
        this.subject = response.data;
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    cancel() {
      this.$router.push({ name: "viewSubject" });
    },
    updateSubject() {
      this.subject.subjectID = this.id;

      SubjectServices.updateSubject(this.subject)
        .then(() => {
          this.$router.push({ name: "viewSubject" });
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
          alert("ERROR:Edit Subject unsuccessful.");
        });
    },
  },
};
</script>

<style></style>

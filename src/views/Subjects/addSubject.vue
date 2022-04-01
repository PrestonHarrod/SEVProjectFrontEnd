<template>
  <div>
    <H1>Add New Subject</H1>
    <v-form>
      <v-col>
        <!-- <v-text-field label="UserID" v-model="tutor.userID" type="text" id="userID"/> -->
                  <v-text-field
            label="level"
            placeholder="1000"
            v-model="subject.level"
            type="text"
            id="level"
          />
          <v-text-field
            label="Subject Area"
            placeholder="Mathematics"
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
        v-on:click.prevent="addSubject()"
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
  </div>
</template>

<script>
import SubjectServices from "@/services/subjectServices.js"
export default {
  data() {
    return {
      subject: {},
    };
  },
  methods: {
    addSubject() {
      SubjectServices.addSubject(this.subject)
        .then(() => {
          this.$router.push({ name: "subjects" });
        })
        .catch((error) => {
          console.log(error);
          alert(
            "ERROR: Adding a student unsuccessful. Make sure that the fields are entered correctly"
          );
        });
    },
    cancel() {
      this.$router.push({ name: "subjects" });
    },
  },
};
</script>
<style></style>
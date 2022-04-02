<template>
  <div>
    <H1>Subject View</H1>
    <br />
    <h2>
      <v-btn
      class='centered-btns'
        v-on:click.prevent="cancel()"
        color="black"
        text
        rounded
        >Go Back</v-btn
      >
    </h2>
    <h3>
      <v-btn
      class='centered-btns'
        v-on:click.prevent="updateSubject(subject)"
        text
        rounded
        >Edit</v-btn
      >

      <br />
      <v-btn
      class='centered-btns'
        color="#E53935"
        v-on:click.prevent="deleteSubject(subject)"
        text
        rounded
        >Delete</v-btn
      >
    </h3>
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
    </v-form>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
  </div>
</template>

<script>
import SubjectServices from "@/services/subjectServices.js";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import Utils from "@/config/utils.js";
export default {
  props: ["id"],
  components: { ConfirmDialog },
  data() {
    return {
      user: {},
      subject: {},
    };
  },
  created() {
    this.user = Utils.getStore("user");
    console.log(this.id + ": The subject's id");
    SubjectServices.getSubject(this.id)
      .then((response) => {
        this.subject = response.data;
      })

      .catch((error) => {
        console.log("Error Retrieving the subject:", error.response);
      });
  },
  methods: {
    addForm() {
      this.addSubjectDisplay = true;
    },

    updateSubject(subject) {
      console.log(subject);
      this.$router
        .push({ name: "editSubject", params: { id: subject.subjectID } })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "subjects" });
    },
    async deleteSubject(subject) {
      let id = subject.subjectID;
      if (confirm("Do you really want to delete this subject?")) {
        SubjectServices.deleteSubject(id)
          .then(() => {
            this.$router.push({ name: "subjects" });
          })

          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
</style>

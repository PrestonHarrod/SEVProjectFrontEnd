<template>
  <div>
    <H1 style="background-color: #1976d2; color: #f2f2f2">Tutor View</H1>
    <br />
    <h2>
      <v-btn
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
        v-on:click.prevent="cancel()"
        color="black"
        text
        rounded
        >Go Back</v-btn
      >
    </h2>
    <h3>
      <v-btn
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
        v-on:click.prevent="updateTutor(tutor)"
        text
        rounded
        >Edit</v-btn
      >

      <br />
      <v-btn
        color="#E53935"
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
        v-on:click.prevent="deleteTutor(tutor)"
        text
        rounded
        >Delete</v-btn
      >
    </h3>
    <v-form>
      <v-col>
        <v-text-field
          label="First Name"
          placeholder="John"
          v-model="tutor.fName"
          readonly
          type="text"
          id="fName"
        />
        <v-text-field
          label="Last Name"
          placeholder="Smith"
          v-model="tutor.lName"
          readonly
          type="text"
          id="lName"
        />
        <v-text-field
          label="Email"
          placeholder="john.smith@eagles.oc.edu"
          readonly
          v-model="tutor.email"
          type="text"
          id="email"
        />
        <v-text-field
          label="Level"
          placeholder="1000"
          v-model="tutor.level"
          readonly
          type="text"
          id="level"
        />
      </v-col>
    </v-form>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
  </div>
</template>

<script>
import UserServices from "@/services/UserServices.js";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import Utils from "@/config/utils.js";
export default {
  props: ["id"],
  components: { ConfirmDialog },
  data() {
    return {
      user: {},
      tutor: {},
    };
  },
  created() {
    this.user = Utils.getStore("user");
    console.log(this.id + ": The Tutor's id");
    UserServices.getUser(this.id)
      .then((response) => {
        this.tutor = response.data;
      })

      .catch((error) => {
        console.log("Error Retrieving the tutor:", error.response);
      });
  },
  methods: {
    addForm() {
      this.addStudentDisplay = true;
    },

    updateTutor(tutor) {
      console.log(tutor);
      this.$router
        .push({ name: "editTutor", params: { id: tutor.userID } })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "tutors" });
    },
    async deleteTutor(tutor) {
      let id = tutor.userID;
      if (confirm("Do you really want to delete this tutor?")) {
        UserServices.deleteUser(id)
          .then(() => {
            this.$router.push({ name: "tutors" });
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
th {
  text-align: left;
  font-size: 1.5rem !important;
}
</style>

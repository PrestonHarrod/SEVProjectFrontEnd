<template>
  <div>
    <H1>Mentee View</H1>
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
        v-on:click.prevent="updateStudent(student)"
        text
        rounded
        >Edit</v-btn
      >

      <br />
      <v-btn
      class='centered-btns'
        color="#E53935"
        v-on:click.prevent="deleteStudent(student)"
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
          v-model="student.fName"
          readonly
          type="text"
          id="fName"
        />
        <v-text-field
          label="Last Name"
          placeholder="Smith"
          v-model="student.lName"
          readonly
          type="text"
          id="lName"
        />
        <v-text-field
          label="Email"
          placeholder="john.smith@eagles.oc.edu"
          v-model="student.email"
          readonly
          type="text"
          id="email"
        />
        <v-text-field
          label="Level"
          placeholder="1000"
          readonly
          v-model="student.level"
          type="text"
          id="level"
        />
        <v-text-field
          label="Phone Number"
          placeholder="405-555-4954"
          readonly
          v-model="student.phoneNumber"
          type="text"
          id="phoneNumber"
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
      student: {},
    };
  },
  created() {
    this.user = Utils.getStore("user");
    console.log(this.id + ": The student's id");
    UserServices.getUser(this.id)
      .then((response) => {
        this.student = response.data;
      })

      .catch((error) => {
        console.log("Error Retrieving the student:", error.response);
      });
  },
  methods: {
    addForm() {
      this.addStudentDisplay = true;
    },

    updateStudent(student) {
      console.log(student);
      this.$router
        .push({ name: "editMentee", params: { id: student.userID } })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "mentees" });
    },
    async deleteStudent(student) {
      let id = student.userID;
      if (confirm("Do you really want to delete this student?")) {
        UserServices.deleteUser(id)
          .then(() => {
            this.$router.push({ name: "students" });
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

<template>
  <div>
    <H1 style="background-color: #811429; color: #f2f2f2">Student View</H1>
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
        v-if="user.adminID != null"
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
        v-on:click.prevent="updateTutor(tutor)"
        text
        rounded
        >Edit</v-btn
      >
      <v-btn
        v-else-if="user.advisorID != null"
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
          readonly
          label="advisorID"
          v-model="student.advisorID"
          type="text"
          id="advisorID"
        />
        <v-text-field
          readonly
          label="Degree"
          v-model="student.degreeID"
          type="text"
          id="degreeID"
        />
        <v-text-field
          readonly
          label="First Name"
          v-model="student.fName"
          type="text"
          id="fName"
        />
        <v-text-field
          readonly
          label="Last Name"
          v-model="student.lName"
          type="text"
          id="lName"
        />
        <v-text-field
          readonly
          label="Major"
          v-model="student.major"
          type="text"
          id="major"
        />
        <v-text-field
          readonly
          label="Graduation Date"
          v-model="student.grad_date"
          type="text"
          id="grad_date"
        />
        <v-text-field
          readonly
          label="Email"
          v-model="student.email"
          type="text"
          id="email"
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
      //   this.$router.push({ name: 'editstudent', params: {id: student.studentID}})
      // .then(() => {
      // })
      // .catch(error => {
      //  console.log(error)
      // })
    },
    cancel() {
      this.$router.push({ name: "tutors" });
    },
    async deleteStudent(tutor) {
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
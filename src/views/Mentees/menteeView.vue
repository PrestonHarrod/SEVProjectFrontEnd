<template>
  <div>
    <H1 style="background-color: #811429; color: #f2f2f2">Mentee View</H1>
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
        v-on:click.prevent="updateStudent(student)"
        text
        rounded
        >Edit</v-btn
      >

      <br />
      <v-btn
        color="#E53935"
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
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
          type="text"
          id="fName"
        />
        <v-text-field
          label="Last Name"
          placeholder="Smith"
          v-model="student.lName"
          type="text"
          id="lName"
        />
        <v-text-field
          label="Email"
          placeholder="john.smith@eagles.oc.edu"
          v-model="student.email"
          type="text"
          id="email"
        />
        <v-text-field
          label="Level"
          placeholder="1000"
          v-model="student.level"
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
      //   this.$router.push({ name: 'editstudent', params: {id: student.studentID}})
      // .then(() => {
      // })
      // .catch(error => {
      //  console.log(error)
      // })
    },
    cancel() {
      this.$router.push({ name: "students" });
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
th {
  text-align: left;
  font-size: 1.5rem !important;
}
</style> 
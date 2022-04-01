<template>
  <div>
    <H1>Supervisor View</H1>
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
        v-on:click.prevent="updateSupervisor(supervisor)"
        text
        rounded
        >Edit</v-btn
      >

      <br />
      <v-btn
      class='centered-btns'
        color="#E53935"
        v-on:click.prevent="deleteSupervisor(supervisor)"
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
          readonly
          v-model="supervisor.fName"
          type="text"
          id="fName"
        />
        <v-text-field
          label="Last Name"
          placeholder="Smith"
          readonly
          v-model="supervisor.lName"
          type="text"
          id="lName"
        />
        <v-text-field
          label="Email"
          placeholder="john.smith@eagles.oc.edu"
          readonly
          v-model="supervisor.email"
          type="text"
          id="email"
        />
        <v-text-field
          label="Phone Number"
          placeholder="405-555-5943"
          readonly
          v-model="supervisor.phoneNumber"
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
      supervisor: {},
    };
  },
  created() {
    this.user = Utils.getStore("user");
    UserServices.getUser(this.id)
      .then((response) => {
        this.supervisor = response.data;
      })

      .catch((error) => {
        console.log("Error Retrieving the supervisor:", error.response);
      });
  },
  methods: {
    addForm() {
      this.addStudentDisplay = true;
    },

    updateSupervisor(supervisor) {
      this.$router
        .push({ name: "editSupervisor", params: { id: supervisor.userID } })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "supervisors" });
    },
    async deleteSupervisor(supervisor) {
      let id = supervisor.userID;
      if (confirm("Do you really want to delete this supervisor?")) {
        UserServices.deleteUser(id)
          .then(() => {
            this.$router.push({ name: "supervisors" });
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

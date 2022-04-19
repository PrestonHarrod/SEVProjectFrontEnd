<template>
  <div>
      <br>
    <H1>Request View</H1>
    <br />
    <h3>
      <v-btn
      class='centered-btns'
        v-on:click.prevent="cancel()"
        color="black"
        text
        rounded
        >Go Back</v-btn
      >
    </h3>
    <h3>

      <v-btn
      class='centered-btns'
        color="#E53935"
        v-on:click.prevent="deleteRequest(request)"
        text
        rounded
        >Delete</v-btn
      >
    </h3>
    <v-form>
      <v-col>
        <v-text-field
          label="Student's Name"
          placeholder="John"
          :value="this.studentName"
          readonly
          type="text"
          id="fName"
        />

        <v-text-field
          label="Email"
          placeholder="john.smith@eagles.oc.edu"
          readonly
          :value="this.studentEmail"
          type="text"
          id="email"
        />
        <v-text-field
          label="Type"
          placeholder="Concern"
          v-model="request.Type"
          readonly
          type="text"
          id="type"
        />
        <v-text-field
          label="Description"
          placeholder="Details"
          v-model="request.desc"
          readonly
          type="text"
          id="desc"
        />
        <v-text-field
          label="Assigned Supervisor"
          placeholder="Supervisor"
          :value="this.supervisorName"
          readonly
          type="text"
          id="supervisorID"
        />
        <v-text-field
          label="Status"
          placeholder="Status"
          v-model="request.status"
          readonly
          type="text"
          id="status"
        />
      </v-col>
    </v-form>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
  </div>
</template>

<script>
import requestServices from "@/services/requestServices.js";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import userServices from "@/services/UserServices.js";

import Utils from "@/config/utils.js";
export default {
  props: ["id"],
  components: { ConfirmDialog },
  data() {
    return {
      request: {},
      studentName: "",
      studentEmail: "",
      supervisorName: "",
    };
  },
  created() {
      
    this.user = Utils.getStore("user");
    requestServices.getRequest(this.id)
      .then((response) => {
        this.request = response.data;
        console.log(response.data.userID + "studentiD");
        console.log(response.data.supervisorID + "supervisorID");
         userServices.getUser(response.data.userID).then((response1) => {
          this.studentName = response1.data.fName + " " + response1.data.lName;
          this.studentEmail = response1.data.email;
          if (response.data.supervisorID != null) {
      userServices.getUser(response.data.supervisorID).then((response2) => {
          this.supervisorName = response2.data.fName + " " + response2.data.lName;
      })
      }
      else {
          this.supervisorName = "";
      }
      })
      
      })

     
  },
  methods: {


    cancel() {
      this.$router.push({ name: "requests" });
    },
    async deleteRequest(request) {
      let id = request.requestID;
      if (confirm("Do you really want to delete this request?")) {
        requestServices.deleteRequest(id)
          .then(() => {
            this.$router.push({ name: "requests" });
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

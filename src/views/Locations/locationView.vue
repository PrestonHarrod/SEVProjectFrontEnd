<template>
  <div>
    <H1 style="background-color: #1976d2; color: #f2f2f2">Location View</H1>
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
        v-on:click.prevent="updateLocation(location)"
        text
        rounded
        >Edit</v-btn
      >

      <br />
      <v-btn
        color="#E53935"
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
        v-on:click.prevent="deleteLocation(location)"
        text
        rounded
        >Delete</v-btn
      >
    </h3>
    <v-form>
      <v-col>
        <v-text-field
          label="Building"
          placeholder="Garvey"
          v-model="location.building"
          readonly
          type="text"
          id="building"
        />
        <v-text-field
          label="Room Number"
          placeholder="107b"
          v-model="location.roomNum"
          readonly
          type="text"
          id="roomNum"
        />
        <v-text-field
          label="Description"
          placeholder="This is a description"
          v-model="location.desc"
          readonly
          type="text"
          id="desc"
        />
      </v-col>
    </v-form>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
  </div>
</template>

<script>
import LocationServices from "@/services/locationServices.js"
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import Utils from "@/config/utils.js";
export default {
  props: ["id"],
  components: { ConfirmDialog },
  data() {
    return {
      user: {},
      location: {},
    };
  },
  created() {
    this.user = Utils.getStore("user");
    console.log(this.id + ": The locations's id");
    LocationServices.getLocation(this.id)
      .then((response) => {
        this.location = response.data;
      })

      .catch((error) => {
        console.log("Error Retrieving the location:", error.response);
      });
  },
  methods: {
    addForm() {
      this.addLocationDisplay = true;
    },

    updateLocation(location) {
      console.log(location);
      this.$router
        .push({ name: "editLocation", params: { id: location.locationID } })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "locations" });
    },
    async deleteLocation(location) {
      let id = location.locationID;
      if (confirm("Do you really want to delete this location?")) {
        LocationServices.deleteLocation(id)
          .then(() => {
            this.$router.push({ name: "locations" });
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

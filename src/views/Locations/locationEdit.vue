<template>
  <div>
    <H1 style="background-color: #1976d2; color: #f2f2f2">Location Edit</H1>
    <v-app>
      <v-form>
        <v-col>
         <v-text-field
          label="Building Name"
          placeholder="Garvey"
          v-model="location.building"
          type="text"
          id="fName"
        />
        <v-text-field
          label="Room Number"
          placeholder="101"
          v-model="location.roomNum"
          type="text"
          id="roomNum"
        />
        <v-text-field
          label="description"
          placeholder="new description"
          v-model="location.desc"
          type="text"
          id="desc"
        />
        </v-col>
        <v-btn
          :style="{ transform: 'translateX(-50%)' }"
          v-on:click.prevent="updateLocation()"
          text
          rounded
          >Submit</v-btn
        >
        <v-btn
          :style="{ transform: 'translateX(-50%)' }"
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
import LocationServices from "@/services/locationServices.js"
import Utils from "@/config/utils.js";
export default {
  props: ["id"],
  components: {},
  data() {
    return {
      user: {},
      location: {},
      menu: false,
    };
  },
  created() {
    this.user = Utils.getStore("user");
    LocationServices.getLocation(this.id)
      .then((response) => {
        this.location = response.data;
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    cancel() {
      this.$router.push({ name: "viewLocation" });
    },
    updateLocation() {
      this.location.locationID = this.id;

      LocationServices.updateLocation(this.location)
        .then(() => {
          this.$router.push({ name: "viewLocation" });
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
          alert("ERROR:Edit Location unsuccessful.");
        });
    },
  },
};
</script>

<style></style>

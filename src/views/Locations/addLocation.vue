<template>
  <div>
    <H1 style="background-color: #1976d2; color: #f2f2f2">Add New Location</H1>
    <v-form>
      <v-col>
        <!-- <v-text-field label="UserID" v-model="tutor.userID" type="text" id="userID"/> -->
        <v-text-field
          label="Building Name"
          placeholder="Garvey"
          v-model="location.building"
          type="text"
          id="building"
        />
        <v-text-field
          label="Room Number"
          placeholder="101B"
          v-model="location.roomNum"
          type="text"
          id="roomNum"
        />
        <v-text-field
          label="description"
          placeholder="description about the building and room number"
          v-model="location.desc"
          type="text"
          id="desc"
        />
      </v-col>
      <v-btn
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
        v-on:click.prevent="addLocation()"
        text
        rounded
        >Submit</v-btn
      >
      <v-btn
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
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
import LocationServices from "@/services/locationServices.js"
export default {
  data() {
    return {
      location: {},
    };
  },
  methods: {
    addLocation() {
      LocationServices.addLocation(this.location)
        .then(() => {
          this.$router.push({ name: "locations" });
        })
        .catch((error) => {
          console.log(error);
          alert(
            "ERROR: Adding a student unsuccessful. Make sure that the fields are entered correctly"
          );
        });
    },
    cancel() {
      this.$router.push({ name: "locations" });
    },
  },
};
</script>
<style></style>
<template>
  <v-container fluid fill-height>
    <div>
      <H1 style="background-color: #1976d2; color: #f2f2f2">Locations</H1>
      <br />
      <br />
      <h2>
        <v-btn
          :style="{ left: '50%', transform: 'translateX(-50%)' }"
          @click="goToAdd()"
          color="black"
          text
          rounded
          >Add Location</v-btn
        >
      </h2>
      <br />
      <v-card width="100vw">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search by First or Last Name"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-model="selected"
          show-select
          single-select
          :headers="headers"
          :items="locations"
          item-key="building"
          :items-per-page="25"
          :search="search"
          @click:row="viewLocation"
        >
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import Utils from "@/config/utils.js";
import LocationServices from "@/services/locationServices.js"
export default {
  components: {},
  data() {
    return {
      selected: [],
      location: {},
      search: "",
      headers: [
        {
          text: "Building",
          align: "start",
          filterable: true,
          value: "building",
        },
        {
          text: "Room Number",
          align: "start",
          filterable: false,
          value: "roomNum",
        },
        {
          text: "Description",
          align: "start",
          filterable: false,
          value: "desc",
        },
      ],
      locations: [{}],
    };
  },
  created() {
    this.user = Utils.getStore("user");
    LocationServices.getLocations()
      .then((response) => {
        this.locations = response.data;
      })

      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    goToAdd() {
      this.$router
        .push({ name: "addLocation" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    viewLocation(location) {
      let id = location.locationID;
      this.$router
        .push({ name: "viewLocation", params: { id: id } })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
H1 {
  text-align: center;
  font-size: 3.5rem !important;
}
th {
  text-align: left;
  font-size: 1.5rem !important;
}
</style>

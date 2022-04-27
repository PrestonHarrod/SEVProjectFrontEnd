<template>
  <v-container>
    <div>
      <v-row>
      <v-combobox
        @input="changeOrgItem"
        v-model="orgItem"
        :items="orgItems"
        item-text="name"
        item-value="link"
        label="Organization Items"
      ></v-combobox>
    </v-row>
      <H1>Locations</H1>
      <v-btn
      class="centered-btns"
          @click="goToAdd()"
          color="black"
          text
          rounded
          >Add Location</v-btn
        >
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
      orgItems: [],
      orgItem: "",
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
      if(Utils.getStore("currentOrg") == 1)
        this.orgItems = [{name: "Users", link: "users"}, {name: "Students", link: "students"}, {name: "Tutors", link: "tutors"},
                     {name: "Mentees", link: "mentees"}, {name: "Locations", link: "locations"}, {name: "Subjects", link: "subjects"}];
      else
        this.orgItems = [{name: "Users", link: "users"}, {name: "Students", link: "students"}, {name: "Tutors", link: "tutors"},
                        {name: "Locations", link: "locations"}, {name: "Subjects", link: "subjects"}];
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
    changeOrgItem() {
      this.$router.push({ name: this.orgItem.link})
    }
  },
};
</script>

<style>
</style>

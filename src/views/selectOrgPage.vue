<template>
  <div>
    <H1>Select Organization</H1
    >
    <v-btn class="orgButtons"
      elevation="2"
      v-on:click.prevent="selectOrg(1)"
      v-if="this.getOrgs(1)"
      x-large
      >Student Success Center</v-btn
    >
    <v-btn class="orgButtons"
      elevation="2"
      v-on:click.prevent="selectOrg(2)"
      v-if="this.getOrgs(2)"
      x-large
      >Writing Center</v-btn
    >
    <v-btn class="orgButtons"
      elevation="2"
      v-on:click.prevent="selectOrg(3)"
      v-if="this.getOrgs(3)"
      x-large
      >New College</v-btn
    >
  </div>
</template>
<script>
import Utils from "@/config/utils.js";
export default {
  created() {
    this.user = Utils.getStore("user"); //gets the user that is logged in
  },
  methods: {
    getOrgs(num) {
      console.log("orgs: " + this.user.orgs);
      return this.user.orgs.includes(num); //return if it includes the role responsible
    },
    selectOrg(org) {
      Utils.setStore("currentOrg", org);
      this.$router.push({ name: "/"});
    },
  },
};
</script>
<style>
</style>
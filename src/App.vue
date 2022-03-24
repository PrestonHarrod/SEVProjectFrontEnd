<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-app>
          <div v-if="isLogin()">
            <h1><Avatar /></h1>
            <p><NavBar /></p>
          </div>
          <router-view />
        </v-app>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Avatar from "./components/avatar.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Avatar,
  },
  methods: {
    isLogin() {
      return this.$route.name != "login" && this.$route.name != "selectOrg";
    },

  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

p {
  margin-top: -65px;
}

h1 {
  margin-left: 25px;
}
</style>

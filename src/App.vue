<template>
<v-container fluid>
  <v-layout>
      <v-flex>
        <div>
          <div v-if= "isLogin()">
          <Nav/>
            <NavBar/>
          </div>
          <router-view />
          
        </div>
      </v-flex>
  </v-layout>
</v-container>
</template>

<script>

import Nav from "./components/Nav.vue"
import NavBar from "./components/NavBar.vue"
export default {
  name: "App",
  components: {
    Nav,
    NavBar,
  },
  methods : {
    isLogin() {
     return this.$route.name != 'login';
    }
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
</style>
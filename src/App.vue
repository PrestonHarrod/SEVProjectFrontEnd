<template>
  <div id="app">
    <SocialLogin/>
  </div>
</template>

<script>
import SocialLogin from "./components/SocialLogin.vue";

export default {
  name: "App",
  components: {
    SocialLogin,
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

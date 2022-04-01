<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-app>
          <div v-if="isLogin()">
            <Avatar class="avatar" />
            <NavBar class="navbarCenter" />
          </div>
          <p id="orgText">testing</p>
          <router-view />
        </v-app>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Avatar from "./components/avatar.vue";
// import Utils from "@/config/utils.js";

export default {
  name: "App",
  created() {

  },
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
/* app.vue */

#app {
  font-family: "Trebuchet MS", sans-serif;
  /* font-family: Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #eaf3ff;
}

.avatar {
  margin-left: 25px;
}
.navbarCenter {
  margin-top: -65px;
}

h1 {
  color: #fffcff;
  background-color: #811429;
  /* background-color: #2c9292; */
}
h2 {
  background-color: #811429;
  color: #f2f2f2;
}

/* NavBar */
nav {
  width: 100vw;
  background-color: #811429;
  display: flex;
  align-items: center;
  justify-content: center;
}
nav .menu-item {
  color: #fff;
  background-color: #811429;
  padding: 25px 40px;
  position: relative;
  text-align: center;
  border-bottom: 5px solid transparent;
  display: flex;
  transition: 0.4s;
}
nav .menu-item.active,
nav .menu-item:hover {
  background-color: #48111c;
  border-bottom-color: #708e9a;
}
nav .menu-item a {
  color: inherit;
  text-decoration: none;
}

/* AdminServices */
nav .menu-item svg {
  width: 10px;
  margin-left: 10px;
}
nav .menu-item .sub-menu {
  position: absolute;
  background-color: #222;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  border-radius: 0px 0px 16px 16px;
  z-index: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.sub-menu {
  cursor: pointer;
}

/* confirmDialogue.vue */
.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.ok-btn {
  color: red;
  text-decoration: underline;
  line-height: 2.5rem;
  cursor: pointer;
}
.cancel-btn {
  padding: 0.5em 1em;
  background-color: #d5eae7;
  color: #35907f;
  border: 2px solid #0ec5a4;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
}
/* popUpModal.vue */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.popup-modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  z-index: 1;
}
.window {
  background: #fff;
  border-radius: 5px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
}
/* studentServices.vue */
nav .menu-item svg {
  width: 10px;
  margin-left: 10px;
}
nav .menu-item .sub-menu {
  position: absolute;
  background-color: #222;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  border-radius: 0px 0px 16px 16px;
  z-index: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.sub-menu {
  cursor: pointer;
}

H1 {
  text-align: center;
  font-size: 3.5rem !important;
}
th {
  text-align: left;
  font-size: 1.5rem !important;
}

/* tutorViewShedule.vue */
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}
.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}

/* selectOrgPage.vue */
.orgButtons {
  margin-right: 50px;
  margin-top: 10px;
  margin-left: 50px;
}
</style>

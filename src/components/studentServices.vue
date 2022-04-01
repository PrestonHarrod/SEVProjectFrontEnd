<template>
  <div class="menu-item" @click="isOpen = !isOpen">
    <a href="#">
      {{ title }}
    </a>
    <svg viewBox="0 0 1030 638" width="10">
      <path
        d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
        fill="#FFF"
      ></path>
    </svg>
    <transition name="fade" apear>
      <div class="sub-menu" v-if="isOpen">
        <div class="menu-item">
          <router-link to="/student/sessionsCalender">Sessions</router-link>
        </div>
        <div class="menu-item">
          <router-link :to="{ name: 'studentSubjectView' }"
            >Schedule Session</router-link
          >
        </div>
        <div class="menu-item" v-if="isSS()" v-on:click.prevent="goToDropIn()">
          Drop In Tutoring
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Utils from "@/config/utils.js";
export default {
  name: "services",
  props: ["title"],
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    goToBooking() {
      this.$router
        .push({ name: "booking" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToStudentSessions() {
      this.$router
        .push({ name: "studentSessions" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToScheduleSession() {
      this.$router
        .push({ name: "" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToDropIn() {
      this.$router
        .push({ name: "dropInTutoring" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    isSS() {
      var currentOrg = Utils.getStore("currentOrg");
      return currentOrg == 1;
    },
  },
};
</script>

<style>
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
</style>

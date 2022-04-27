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
        <div class="menu-item" v-on:click.prevent="goToSchedule()">
          Schedule
        </div>
        
        <div class="menu-item" v-on:click.prevent="goToTutorSessions()">
          Sessions
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "services",
  props: ["title"],
  components: {},
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    goToSchedule() {
      this.$router
        .push({ name: "schedule" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToSubjects() {
      this.$router
        .push({ name: "subject" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToRequests() {
      this.$router
        .push({ name: "request" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToTutorSessions() {
      this.$router
        .push({ name: "tutorsessionlist" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>

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
        <div class="menu-item" v-on:click.prevent="goToUsers()">Users</div>
        <div class="menu-item" v-on:click.prevent="goToSupervisors()">
          Supervisors
        </div>
        <div class="menu-item" v-on:click.prevent="goToStudents()">
          Students
        </div>
        <div class="menu-item" v-on:click.prevent="goToTutors()">Tutors</div>
        <div class="menu-item" v-on:click.prevent="goToMentees()">Mentees</div>
        <div class="menu-item" v-on:click.prevent="goToSessions()">
          Sessions
        </div>
        <div class="menu-item" v-on:click.prevent="goToRequests()">
          Requests
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "services",
  props: ["title"],
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    goToUsers() {
      this.$router
        .push({ name: "users" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToSupervisors() {
      this.$router
        .push({ name: "supervisors" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToStudents() {
      this.$router
        .push({ name: "students" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToTutors() {
      this.$router
        .push({ name: "tutors" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToMentees() {
      this.$router
        .push({ name: "mentees" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToSessions() {
      this.$router
        .push({ name: "adminSessions" })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    goToRequests() {
      this.$router
        .push({ name: "requests" })
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

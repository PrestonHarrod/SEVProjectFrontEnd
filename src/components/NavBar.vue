<template>
  <nav id="vue">
    <div class="menu-item"><router-link to="/">Home</router-link></div>
    <AdminServices title="Admin" />
    <TutorServices title="Tutor" />
    <StudentServices title="Student" />
    <div class="menu-item"><router-link to="/login">Logout</router-link></div>
  </nav>
</template>

<script>
import AdminServices from "../components/adminServices";
import StudentServices from "../components/studentServices";
import TutorServices from "../components/tutorServices";
export default {
  name: "navbar",
  components: {
    AdminServices,
    TutorServices,
    StudentServices,
  },
};
</script>

<style>
nav {
  width: 100vw;
  background-color: #0d0d0e;
  display: flex;
  align-items: center;
  justify-content: center;
}
nav .menu-item {
  color: #fff;
  padding: 25px 40px;
  position: relative;
  text-align: center;
  border-bottom: 5px solid transparent;
  display: flex;
  transition: 0.4s;
}
nav .menu-item.active,
nav .menu-item:hover {
  background-color: #0d0d0e;
  border-bottom-color: #0c76a0;
}
nav .menu-item a {
  color: inherit;
  text-decoration: none;
}
</style>

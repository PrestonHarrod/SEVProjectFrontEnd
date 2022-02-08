
<template>
    <nav id="vue">
        <div class="menu-item"><router-link to="/">Home</router-link></div>
        <AdminServices title="Admin" /> 
        <TutorServices title="Tutor" /> 
        <StudentServices title="Student" /> 
    </nav>
</template>

<script>
import AdminServices from '../components/adminServices'
import StudentServices from '../components/studentServices'
import TutorServices from '../components/tutorServices'
export default {
  name: 'navbar',
  components: {
    AdminServices,
    TutorServices,
    StudentServices
  },
}
</script>
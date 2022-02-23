<template>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Student Edit</H1>
<v-app>
<v-form>
  <v-col>
   <v-text-field
          label="First Name"
          placeholder="John"
          v-model="student.fName"
          type="text"
          id="fName"
        />
        <v-text-field
          label="Last Name"
          placeholder="Smith"
          v-model="student.lName"
          type="text"
          id="lName"
        />
        <v-text-field
          label="Email"
          placeholder="john.smith@eagles.oc.edu"
          v-model="student.email"
          type="text"
          id="email"
        />
        <v-text-field
          label="Level"
          placeholder="1000"
          v-model="student.level"
          type="text"
          id="level"
        />
  </v-col>
  <v-btn  :style="{transform:'translateX(-50%)'}" v-on:click.prevent="updateStudent()" text rounded>Submit</v-btn>
  <v-btn :style="{transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
</v-form>
</v-app>   
</div>
</template>
<script>
import UserServices from '@/services/UserServices.js'
import Utils from '@/config/utils.js'
export default {
  props: ['id'],
  components: {
  },
  data() {
    return {
      user: {},
      student: {},
      menu: false,
    }
  },
  created() {
      this.user = Utils.getStore('user')
      UserServices.getUser(this.id)
      .then(response => {
        this.student = response.data;
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  methods: {
    
    cancel() {
      this.$router.push({ name: 'viewStudent' })
    },
    updateStudent(){
      UserServices.updateStudent(this.student)
      .then(() => {
        this.$router.push({name: 'viewStudent'});
        })
        .catch(error => {
        console.log('There was an error:', error.response)
        alert("ERROR:Edit student unsuccessful. Make sure that fields are entered correctly and that the Advisor ID and Degree ID exists in the system.");
        })
        
    },
    deleteStudent(id){
    UserServices.deleteStudent(this.id)
      .then(() => {
        this.students.forEach((student,i) => {
          if (student.id == id) {
            this.students.splice(i, 1);
          }
        })
          
        })
        .catch(error => {
         this.message = error.response.data.message
        })
    },
    
}
}
</script>

<style></style>
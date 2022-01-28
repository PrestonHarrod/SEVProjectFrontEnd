<template>
    <v-container>
        <v-row>
            <v-col>         
                <p >Welcome, {{user.user}}</p>        
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Utils from '@/config/utils.js';
// import StudentServices from '@/services/studentServices.js';
// import AdvisorServices from '@/services/advisorServices.js';
// import Nav from '@/components/Nav.vue'


export default {

    data() {
        return {
            //components: {Nav},
            user: {},
        };
    },
    async created()  {
        this.user = Utils.getStore('user');
        //console.log("advisorId="+this.user.advisorID+" studentId="+this.user.studentID)
        if (this.user != null) {
          Utils.setStore("user",null);
            this.$router.push({ name: 'home' });
        } 
        // else {
        //     if (this.user != null && this.user.studentID != null){
        //       await StudentServices.getStudent(this.user.studentID)
        //         .catch(() => {
        //           Utils.setStore("user",null);
        //           this.$router.push({ name: 'home' });
        //       });
        //   }
        // }
    }
}
</script>

<style></style>
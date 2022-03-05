<template>
   <div style="background-color: #811429; height: 665px">
      <v-container>
         <v-row>
            <v-col>
               <div class="v-main__wrap">
                  <div class="container">
                     <div class="row">
                         <div class="col col-4" />
                        <div class="col col-4">
                           <div  class="v-card v-sheet theme--light" style="cursor: grab"  v-on:click.prevent="goToStudents()">
                              <v-img style="margin-left: 22%; margin-right: 20%"  max-width="200" max-height="200" src="@/assets/book.png" />
                              <H2 style="text-align: center"> Request A Class </H2>
                           </div>
                        </div>
                        <div class="col col-4">
                           <div  class="v-card v-sheet theme--light" style="cursor: grab" v-on:click.prevent="goToAdvisors()">
                              <v-img style="margin-left: 22%; margin-right: 20%" max-width="200" max-height="200" src="@/assets/teacher.png" />
                              <H2 style="text-align: center"> Apply For Tutor </H2>
                           </div>
                        </div>                       
                     </div>
                  </div>
               </div>
            </v-col>
         </v-row>
      </v-container>
   </div>
</template>

<script>
</script>

<style></style>

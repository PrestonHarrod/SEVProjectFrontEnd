<template>
 <div>
      <br>
    <H1>Request Lists</H1>
    <br />
   <v-row>
     <v-col>
   <h2>Open Requests</h2>
      <div
  class="drop-zone"
  @drop="onDrop($event, 1)"
  @dragover.prevent
  @dragenter.prevent
>
<div
  class="drag-el"
  v-for="item in listOne"
  :key="item.id"
  draggable
   @click="test(item.id)"
  @dragstart="startDrag($event, item)"
>
  {{ item.title }}
</div>
    </div>
     </v-col>
       <br>
<v-col>
   <h2>In-Progress Requests</h2>
    <div
  class="drop-zone"
  @drop="onDrop($event, 2)"
  @dragover.prevent
  @dragenter.prevent
>

      <div
  class="drag-el"
  v-for="item in listTwo"
  :key="item.id"
  draggable
   @click="test(item.id)"
  @dragstart="startDrag($event, item)"
>
  {{ item.title }}
</div>

    </div>
</v-col>
       <br>
<v-col>
       <h2>Completed Requests</h2>
          <div
  class="drop-zone"
  @drop="onDrop($event, 3)"
  @dragover.prevent
  @dragenter.prevent
>
<div
  class="drag-el"
  v-for="item in listThree"
  :key="item.id"
  draggable
   @click="test(item.id)"
  @dragstart="startDrag($event, item)"
>
  {{ item.title }}
</div>
    </div>
</v-col>
   </v-row>
  </div>
  
</template>
<script>
import requestServices from "@/services/requestServices.js"
import Utils from "@/config/utils.js";
import UserServices from "@/services/UserServices.js";


export default {
  	computed: {
      listOne () {
        return this.items.filter(item => item.list === 1)
      },
      listTwo () {
        return this.items.filter(item => item.list === 2)
      },
       listThree () {
        return this.items.filter(item => item.list === 3)
      }
  	},
data () {
      return {
        studentName: "",
        user: [],
        items: [
        {
         
        }]
      }
  	},

    created() {
      this.user = Utils.getStore("user");
      var currentOrg = Utils.getStore("currentOrg");

      //will need to get by org
      requestServices.getRequestsForOrg(currentOrg).then((response) => {
        {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].status == "Open") {
            UserServices.getUser(response.data[i].userID).then(
            (response1) => {
            this.studentName = response1.data.fName + " " + response1.data.lName;
            this.items.push({
            id: response.data[i].requestID,
            list: 1,
            title: this.studentName + ": " + response.data[i].Type
          })
            }
          )
        
            }
            else if (response.data[i].status == "In-Progress") {
            UserServices.getUser(response.data[i].userID).then(
            (response1) => {
            this.studentName = response1.data.fName + " " + response1.data.lName;
            this.items.push({
            id: response.data[i].requestID,
            list: 2,
            title: this.studentName + ": " + response.data[i].Type
          })
            }
          )

            }
            else if (response.data[i].status == "Completed") {
            UserServices.getUser(response.data[i].userID).then(
            (response1) => {
              this.studentName = response1.data.fName + " " + response1.data.lName;
            this.items.push({
            id: response.data[i].requestID,
            list: 3,
            title: this.studentName + ": " + response.data[i].Type
          })
            }
          )

            }
            
          }
          
        }
      }
      )
      
    },
    methods: {
      test (id, studentID, tutorID) {
        console.log(id + "id");
         this.$router
        .push({ name: "supervisorViewRequest", params: { id: id, studentID: studentID, tutorID: tutorID } })
      },
  		startDrag (evt, item) {
        evt.dataTransfer.dropEffect = 'move'
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData('itemID', item.id)
  		},
  		onDrop (evt, list) {
  			const itemID = evt.dataTransfer.getData('itemID')
  			const item = this.items.find(item => item.id == itemID)
  			item.list = list
        console.log(item.id + "requestID");
        console.log(list + "list number");
        console.log(this.user.userID + "userID");
        requestServices.getRequest(item.id).then((response) => {
          this.request = response.data;
          if (list == 1) {
            this.request.status = "Open";
            this.request.supervisorID = null;
            requestServices.updateRequest(this.request);
          }
          else if (list == 2) {
            this.request.status = "In-Progress";
            this.request.supervisorID = this.user.userID;
            requestServices.updateRequest(this.request);

          }
          else if (list == 3) {
            this.request.status = "Completed";
            this.request.supervisorID = this.user.userID;
            requestServices.updateRequest(this.request);


          }
        })
  		}
  	}
  

};
</script>
<style scoped>
  .drop-zone {
    background-color: #811429;
    margin-bottom: 10px;
    padding: 10px;
  }

  .drag-el {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 5px;
  }
  
</style>

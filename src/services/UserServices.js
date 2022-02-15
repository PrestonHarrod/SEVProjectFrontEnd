import {apiClient} from "./apiClient.js";

export default {
  getUsers() {
    return apiClient.get("users");
  },

  getUser(id) {
    console.log(id)
    return apiClient.get("users/" + id);
  },
//   addAdvisor(advisor) {
//     return apiClient.post("users/", advisor);
//   },
//   updateAdvisor(advisor) {
//     return apiClient.put("advisors/" + advisor.advisorID, advisor);
//   },
//   deleteAdvisor(id) {
//     return apiClient.delete("advisors/" + id);
//   }

};
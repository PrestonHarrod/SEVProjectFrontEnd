import {apiClient} from "./apiClient.js";

export default {
  getSessions() {
    return apiClient.get("sessions");
  },

  getSession(id) {
    return apiClient.get("sessions/" + id);
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
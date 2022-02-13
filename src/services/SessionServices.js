import {apiClient} from "./apiClient.js";

export default {
  getSessions() {
    return apiClient.get("sessions");
  },

  getSession(id) {
    return apiClient.get("sessions/" + id);
  }
};
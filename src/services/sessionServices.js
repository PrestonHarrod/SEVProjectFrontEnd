import { apiClient } from "./apiClient.js";

export default {
  getSessions() {
    return apiClient.get("sessions");
  },

  getSession(id) {
    return apiClient.get("sessions/" + id);
  },
  getSessionsForStudent(id) {
    return apiClient.get("sessions?studentID=" + id);
  },
  getSessionsForTutor(id) {
    return apiClient.get("sessions?tutorID=" + id);
  },
    addSession(session) {
      return apiClient.post("sessions/", session);
    },
    // updateAdvisor(advisor) {
    //   return apiClient.put("advisors/" + advisor.advisorID, advisor);
    // },
    deleteSession(sessionID) {
      return apiClient.delete("sessions/" + sessionID);
    }
};

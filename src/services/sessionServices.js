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
  getSessionByTutorSlot(id) {
    return apiClient.get("sessions/tutorSlot/" + id);

  },
    addSession(session) {
      return apiClient.post("sessions/", session);
    },
    updateSession(session) {
      return apiClient.put("sessions/" + session.sessionID, session);
    },
    deleteSession(sessionID) {
      return apiClient.delete("sessions/" + sessionID);
    },
    deleteSessionByTutorSlotID(id) {
      return apiClient.delete("sessions/tutorSlot/" + id);

    }
};

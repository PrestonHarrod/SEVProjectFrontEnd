import {apiClient} from './apiClient.js'


export default {
  getSessions() {
    return apiClient.get("sessions/");
  },
  getSession(id) {
    return apiClient.get("sessions/" + id);
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
}
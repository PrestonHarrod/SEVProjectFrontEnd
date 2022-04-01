import { apiClient } from "./apiClient.js";

export default {
  getSubjects() {
    return apiClient.get("subjects/");
  },
  getSubject(id) {
    return apiClient.get("subjects/" + id);
  },
  addSubject(subject) {
    return apiClient.post("subjects/", subject);
  },
  updateSubject(subject) {
    return apiClient.put("subjects/" + subject.subjectID, subject);
  },
  deleteSubject(subjectID) {
    return apiClient.delete("subjects/" + subjectID);
  },
};

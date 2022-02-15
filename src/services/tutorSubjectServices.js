import {apiClient} from './apiClient.js'


export default {
  getTutorSubjects(id) {
    return apiClient.get("tutorsubjects?tutorID=" + id);
  },
  getTutorSubject(id) {
    return apiClient.get("tutorsubjects/" + id);
  },
  addTutorSubject(tutorSubject) {
    return apiClient.post("tutorsubjects/", tutorSubject);
  },
  updateTutorSubject(tutorSubject) {
    return apiClient.put("tutorsubjects/" + tutorSubject.tutorSubjectID, tutorSubject);
  },
  deleteTutorSubject(tutorSubjectID) {
    return apiClient.delete("tutorsubjects/" + tutorSubjectID);
  },
}
import {apiClient} from "./apiClient.js";

export default {
  getTutorSubjects() {
    return apiClient.get("tutorSubjects");
  },
  getTutorSubjectsForSubject(id) {
    return apiClient.get("tutorSubjects?subjectID=" + id);
  },
  getTutorSubjectsForTutor(id) {
    return apiClient.get("tutorSubjects?tutorID=" + id);
  },
  getTutorSubject(id) {
    return apiClient.get("tutorSubjects/" + id);
  },
  addTutorSubject(tutorSubject) {
    return apiClient.post("tutorSubjects/", tutorSubject);
  },
  updateTutorSubject(tutorSubject) {
    return apiClient.put("tutorSubjects/" + tutorSubject.id, tutorSubject);
  },
  deleteSpecificTutorSubject(tID, sID) {
    return apiClient.delete("tutorSubjects?tutorID=" + tID + "&subjectID=" + sID);
  },
  deleteTutorSubject(id) {
    console.log(id)
    return apiClient.delete("tutorSubjects/" + id);
  }

};

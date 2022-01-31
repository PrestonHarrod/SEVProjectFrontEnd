import {apiClient} from './apiClient.js'


export default {
  getTutors() {
    return apiClient.get("tutors/");
  },
  getTutor(id) {
    return apiClient.get("tutors/" + id);
  },
  addTutor(tutor) {
    return apiClient.post("tutors/", tutor);
  },
  updateTutor(tutor) {
    return apiClient.put("tutors/" + tutor.tutorID, tutor);
  },
  deleteTutor(tutorID) {
    return apiClient.delete("tutors/" + tutorID);
  },
}
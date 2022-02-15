import {apiClient} from './apiClient.js'


export default {
  getTutorSlots() {
    return apiClient.get("tutorSlots/");
  },
  getTutorSlot(id) {
    return apiClient.get("tutorSlots/" + id);
  },
  addTutorSlot(tutorSlot) {
    return apiClient.post("tutorSlots/", tutorSlot);
  },
  updateTutorSlot(tutorSlot) {
    return apiClient.put("tutorSlots/" + tutorSlot.tutorSlotID, tutorSlot);
  },
  deleteTutorSlot(tutorSlotID) {
    return apiClient.delete("tutorSlots/" + tutorSlotID);
  },
}

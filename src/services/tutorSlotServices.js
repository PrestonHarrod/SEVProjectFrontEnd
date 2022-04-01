import { apiClient } from "./apiClient.js";

export default {
  getTutorSlots() {
    return apiClient.get("tutorSlots/");
  },

  getTutorSlot(id) {
    return apiClient.get("tutorSlots/" + id);
  },
  getTutorSlotForTutor(id) {
    return apiClient.get("tutorSlots/tutorSlotForTutor/" + id)
  },
  addTutorSlot(tutorSlot) {
    return apiClient.post("tutorSlots/", tutorSlot);
  },
  updateTutorSlot(tutorSlot) {
    console.log(tutorSlot.tutorSlotID + "ts services");
    return apiClient.put("tutorSlots/" + tutorSlot.tutorSlotID, tutorSlot);
  },
  deleteTutorSlot(tutorSlotID) {
    return apiClient.delete("tutorSlots/" + tutorSlotID);
  },
  cancelSlot(tutorSlot) {
    return apiClient.get("tutorSlots/tutorSlotUnbook/" + tutorSlot);
  }
};

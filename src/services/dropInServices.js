import { apiClient } from "./apiClient.js";

export default {
  //Basic CRUD for dropIns
  getDropIns() {
    return apiClient.get("dropIns/");
  },
  getDropIn(id) {
    return apiClient.get("dropIns/" + id);
  },
  addDropIn(dropIn) {
    return apiClient.post("dropIns/", dropIn);
  },
  updateDropIn(dropIn) {
    return apiClient.put("dropIns/" + dropIn.id, dropIn);
  },
  deleteDropIn(dropIn) {
    return apiClient.delete("dropIns/" + dropIn);
  },
};
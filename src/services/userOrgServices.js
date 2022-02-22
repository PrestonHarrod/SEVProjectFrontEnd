import { apiClient } from "./apiClient.js";

export default {
  getUserOrgs() {
    return apiClient.get("userOrgs/");
  },
  getUsersOrg(id) {
    return apiClient.get("userOrgs/" + id);
  },
  addUserOrg(userOrg) {
    return apiClient.post("userOrgs/", userOrg);
  },
  updateUserOrg(userOrg) {
    return apiClient.put("userOrgs/" + userOrg.orgID, userOrg);
  },
  deleteUserOrg(orgID) {
    return apiClient.delete("userOrgs/" + orgID);
  },
  getUsersOrgID(id) {
    return apiClient.get("userOrgs/student/" + id);
  },
};
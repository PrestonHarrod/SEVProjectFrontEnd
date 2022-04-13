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
  //this deletes ALL the userOrgs
  deleteUserOrg(orgID) {
    return apiClient.delete("userOrgs/deleteAll/" + orgID);
  },
  getUsersOrgID(id) {
    return apiClient.get("userOrgs/student/" + id);
  },

  deleteSpecificUserOrg(uID, oID) {
    return apiClient.delete(
      "userOrgs?userID=" + uID + "&orgID=" + oID
    );
  }

};

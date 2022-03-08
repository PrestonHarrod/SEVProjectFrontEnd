import { apiClient } from "./apiClient.js";

export default {
  getUserRoles() {
    return apiClient.get("userroles/");
  },
  getUserRole(id) {
    return apiClient.get("userroles/" + id);
  },
  addUserRole(userRole) {
    return apiClient.post("userroles/", userRole);
  },
  updateUserRole(userRole) {
    return apiClient.put("userroles/" + userRole.userRoleID, userRole);
  },
  deleteUserRole(userRoleID) {
    return apiClient.delete("userroles/" + userRoleID);
  },
  deleteSpecificUserRole(uID, rID) {
    return apiClient.delete(
      "userroles?userID=" + uID + "&roleID=" + rID
    );
  }
};

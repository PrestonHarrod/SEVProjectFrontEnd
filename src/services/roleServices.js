import { apiClient } from "./apiClient.js";

export default {
  getRoles() {
    return apiClient.get("roles/");
  },
  getRole(id) {
    return apiClient.get("roles/" + id);
  },
  addRole(role) {
    return apiClient.post("roles/", role);
  },
  updateRole(role) {
    return apiClient.put("roles/" + role.roleID, role);
  },
  deleteRole(roleID) {
    return apiClient.delete("roles/" + roleID);
  },
};

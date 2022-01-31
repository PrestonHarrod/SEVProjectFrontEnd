import {apiClient} from './apiClient.js'


export default {
  getAdmins() {
    return apiClient.get("admins/");
  },
  getAdmin(id) {
    return apiClient.get("admins/" + id);
  },
  addAdmin(admin) {
    return apiClient.post("admins/", admin);
  },
  updateAdmin(admin) {
    return apiClient.put("admins/" + admin.adminID, admin);
  },
  deleteAdmin(adminID) {
    return apiClient.delete("admins/" + adminID);
  },
}
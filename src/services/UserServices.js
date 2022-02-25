import { apiClient } from "./apiClient.js";

export default {
  //Basic CRUD for users
  getUsers() {
    return apiClient.get("users/");
  },
  getTutorSubjects(roleID) {
    return apiClient.get("users/tutorSubject/" + roleID);
  },
  getUsersByRole(roleID) {
    return apiClient.get("users/tutorRole/" + roleID);
  },
  getStudents(roleID) {
    return apiClient.get("users/studentRole/" + roleID);
  },
  getUser(id) {
    return apiClient.get("users/" + id);
  },
  addUser(user) {
    return apiClient.post("users/", user);
  },
  updateUser(user) {
    return apiClient.put("users/" + user.userID, user);
  },
  deleteUser(userID) {
    return apiClient.delete("users/" + userID);
  },
};

import {apiClient} from "./apiClient.js";

export default {

  //Basic CRUD for users
  getUsers() {
    return apiClient.get("users");
  },

  getUser(id) {
    return apiClient.get("users/" + id);
  },
  addUser(user) {

    return apiClient.post("users/", user);
  },
  updateUser(user) {
    return apiClient.put("users/" + user.id, user);
  },
  deleteUser(id) {
    return apiClient.delete("users/" + id);
  },


//student only methods
  getStudents(id) {
    return apiClient.delete("users/" + id);
  },
//admin only methods
  getAdmins(id) {
    return apiClient.delete("users/" + id);
  },
//tutor only methods
  getTutors(id) {
    return apiClient.delete("users/" + id);
  },



  

};
import {apiClient} from './apiClient.js'


export default {
  getUsers(roleID) {
    return apiClient.get("users/roleID/" + roleID);
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
}
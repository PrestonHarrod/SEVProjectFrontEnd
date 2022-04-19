import { apiClient } from "./apiClient.js";

export default {
  getRequests() {
    return apiClient.get("requests/");
  },
  getRequest(id) {
    return apiClient.get("requests/" + id);
  },
  addRequest(request) {
    return apiClient.post("requests/", request);
  },
  updateRequest(request) {
    return apiClient.put("requests/" + request.requestID, request);
  },
  deleteRequest(requestID) {
    return apiClient.delete("requests/" + requestID);
  },
  getRequestsForOrg(orgID) {
    return apiClient.get("requests/org/" + orgID);

  }
};

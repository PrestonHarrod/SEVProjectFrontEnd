import {apiClient} from './apiClient.js'


export default {
  getOrgs() {
    return apiClient.get("organizations/");
  },
  getOrg(id) {
    return apiClient.get("organizations/" + id);
  },
  addOrg(org) {
    return apiClient.post("organizations/", org);
  },
  updateOrg(org) {
    return apiClient.put("organizations/" + org.orgID, org);
  },
  deleteOrg(orgID) {
    return apiClient.delete("organizations/" + orgID);
  },
}
import {apiClient} from './apiClient.js'


export default {
  getLocations() {
    return apiClient.get("locations/");
  },
  getLocation(id) {
    return apiClient.get("locations/" + id);
  },
  addLocation(location) {
    return apiClient.post("locations/", location);
  },
  updateLocation(location) {
    return apiClient.put("locations/" + location.locationID, location);
  },
  deleteLocation(locationID) {
    return apiClient.delete("locations/" + locationID);
  },
}
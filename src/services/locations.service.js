import http from "../http-common";
import authHeader from "./auth-header";

class LocationsDataService {
  create(data) {
    return http.post("/locations", data, { headers: authHeader() });
  }
  getAll() {
    return http.get("/locations", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/locations/${id}`, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/locations/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/locations/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/locations`, { headers: authHeader() });
  }
}

export default new LocationsDataService();

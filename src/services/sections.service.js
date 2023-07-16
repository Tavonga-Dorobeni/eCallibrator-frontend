import http from "../http-common";
import authHeader from "./auth-header";

class SectionsDataService {
  create(data) {
    return http.post("/sections", data, { headers: authHeader() });
  }
  getAll() {
    return http.get("/sections", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/sections/${id}`, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/sections/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/sections/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/sections`, { headers: authHeader() });
  }
}

export default new SectionsDataService();

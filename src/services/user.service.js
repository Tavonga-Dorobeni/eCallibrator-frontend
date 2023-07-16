import http from "../http-common";
import authHeader from "./auth-header";

class UserDataService {
  create(data) {
    return http.post("/users", data, { headers: authHeader() });
  }
  getAll() {
    return http.get("/users", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/users/${id}`, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/users/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/users/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/users`, { headers: authHeader() });
  }
}

export default new UserDataService();

import http from "../http-common";
import authHeader from "./auth-header";

class ToolsDataService {
  create(data) {
    return http.post("/tools", data, { headers: authHeader() });
  }
  getAll() {
    return http.get("/tools", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/tools/${id}`, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/tools/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/tools/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/tools`, { headers: authHeader() });
  }
}

export default new ToolsDataService();

import http from "../http-common";
import authHeader from "./auth-header";

class ToolTypesDataService {
  create(data) {
    return http.post("/tool_types", data, { headers: authHeader() });
  }
  getAll() {
    return http.get("/tool_types", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/tool_types/${id}`, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/tool_types/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/tool_types/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/tool_types`, { headers: authHeader() });
  }
}

export default new ToolTypesDataService();

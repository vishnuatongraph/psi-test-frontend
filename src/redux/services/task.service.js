import http from "../../axios-client";

class TaskService {
  create(data) {
    return http.post("/task", JSON.stringify(data));
  }

  update(data, id) {
    return http.put(`/task/${id}`, JSON.stringify(data));
  }

  delete(id) {
    return http.delete(`/task/${id}`);
  }

  getAll(id, token) {
    return http.get(`/task?id=${id}`, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  search(id, query) {
    return http.get(`/task?id=${id}&query=${query}`);
  }
}

export default new TaskService();

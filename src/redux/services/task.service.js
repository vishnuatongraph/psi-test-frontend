import http from '../../axios-client';

class UserService {
    create(data) {
        return http.post("/task", JSON.stringify(data));
    }

    update(data, id) {
        return http.put(`/task/${id}`, JSON.stringify(data));
    }

    delete(id) {
        return http.delete(`/task/${id}`);
    }

    getAll(id) {
        return http.get(`/task?id=${id}`);
    }

    search(id, query) {
        return http.get(`/task?id=${id}&query=${query}`);
    }

    
}

export default new UserService();
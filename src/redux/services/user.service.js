import http from '../../axios-client';

class UserService {
    create(data) {
        return http.post("/user", JSON.stringify(data));
    }

    login(data) {
        return http.post(`/auth/login`, data);
    }
}

export default new UserService();
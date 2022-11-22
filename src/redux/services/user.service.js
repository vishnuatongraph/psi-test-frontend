import http from '../../axios-client';

class UserService {
    create(data) {
        return http.post("/user", JSON.stringify(data));
    }
}

export default new UserService();
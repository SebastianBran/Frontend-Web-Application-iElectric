import http from './http-common'

class AdministratorsApiService {
    getAll() {
        return http.get('/administrators');
    }

    getById(id) {
        return http.get(`/administrators/${ id }`);
    }

    getByEmailAndPassword(email, password) {
        return http.get(`/administrators?email=${ email }&password=${ password }`);
    }

    getByEmail(email) {
        return http.get(`/administrators?email=${ email }`);
    }

    create(data) {
        return http.post('/administrators', data);
    }

    update(id, data) {
        return http.put(`/administrators/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/administrators/${ id }`);
    }
}

export default new AdministratorsApiService();
import http from './http-common'

class PlansApiService {
    getAll() {
        return http.get('/Plans');
    }

    getById(id) {
        return http.get(`/Plans/${ id }`);
    }

    create(data) {
        return http.post('/Plans', data);
    }

    update(id, data) {
        return http.put(`/Plans/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/Plans/${ id }`);
    }
}

export default new PlansApiService();
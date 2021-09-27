import http from './http-common'

class ReserveApiService {
    getAll() {
        return http.get('/reserveModels');
    }

    getById(id) {
        return http.get(`/reserveModels/${ id }`);
    }

    getModels(id) {
        return http.get(`/reserveModels/${ id }/applianceModels`);
    }

    create(data) {
        return http.post('/reserveModels', data);
    }

    update(id, data) {
        return http.put(`/reserveModels/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/reserveModels/${ id }`);
    }
}

export default new ReserveApiService();
import http from './http-common'

class ApplianceClientsApiService {
    create(data) {
        return http.post('/appliances', data);
    }

    update(id, data) {
        return http.put(`/appliances/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/appliances/${ id }`);
    }
}

export default new ApplianceClientsApiService
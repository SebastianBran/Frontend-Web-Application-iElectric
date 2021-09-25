import http from './http-common'

class ApplianceModelsService {
    getAll() {
        return http.get('/applianceModels');
    }

    getById(id) {
        return http.get(`/applianceModels/${ id }`);
    }

    create(data) {
        return http.post('/applianceModels', data);
    }

    update(id, data) {
        return http.put(`/applianceModels/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/applianceModels/${ id }`);
    }
}

export default new ApplianceModelsService();
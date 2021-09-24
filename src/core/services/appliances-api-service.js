import http from './http-common'

class AppliancesApiService {
    getAll() {
        return http.get('/appliance-brands');
    }

    getById(id) {
        return http.get(`/appliance-brands/${ id }`);
    }

    getModels(id) {
        return http.get(`/appliance-brands/${ id }/appliance-models`);
    }

    create(data) {
        return http.post('/appliance-brands', data);
    }

    update(id, data) {
        return http.put(`/appliance-brands/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/appliance-brands/${ id }`);
    }
}

export default new AppliancesApiService();
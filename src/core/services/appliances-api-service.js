import http from './http-common'

class AppliancesApiService {
    getAll() {
        return http.get('/applianceBrands');
    }

    getById(id) {
        return http.get(`/applianceBrands/${ id }`);
    }

    getModels(id) {
        return http.get(`/applianceBrands/${ id }/applianceModels`);
    }

    create(data) {
        return http.post('/applianceBrands', data);
    }

    update(id, data) {
        return http.put(`/applianceBrands/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/applianceBrands/${ id }`);
    }
}

export default new AppliancesApiService();
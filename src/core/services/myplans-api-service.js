import http from './http-common'

class MyPlansApiService {
    getAll() {
        return http.get('/myPlans');
    }

    getById(id) {
        return http.get(`/myPlans/${ id }`);
    }

    getByClientId(id){
        return http.get(`/myPlans?clientId=${ id }`);
    }

    create(data) {
        return http.post('/myPlans', data);
    }

    update(id, data) {
        return http.put(`/myPlans/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/myPlans/${ id }`);
    }
}

export default new MyPlansApiService();
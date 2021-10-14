import http from './http-common'

class AnnouncementsApiService {
    getAll() {
        return http.get('/announcements');
    }

    getById(id) {
        return http.get(`/announcements/${ id }`);
    }

    getByType(type) {
        return http.get(`/administrators?type=${ type }`);
    }

    getBySection(section) {
        return http.get(`/administrators?section=${ section }`);
    }

    create(data) {
        return http.post('/announcements', data);
    }

    update(id, data) {
        return http.put(`/announcements/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/announcements/${ id }`);
    }
}

export default new AnnouncementsApiService();
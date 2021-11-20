import http from './http-common'

class UserApiService {
    signIn(data) {
        return http.post('/users/auth/sign-in', data);
    }

    signUp(data) {
        return http.post('/users/auth/sign-un', data);
    }

    getAll() {
        return http.get('/users');
    }
}

export default new UserApiService();
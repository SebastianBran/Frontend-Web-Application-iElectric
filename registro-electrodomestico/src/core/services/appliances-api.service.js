import http from "./http-common"

class AppliancesApiService{
    getAll(){
        return http.get("/appliances");
    }

    getById(id){
        return http.get(`/appliances/${id}`);
    }
}

export default new AppliancesApiService();
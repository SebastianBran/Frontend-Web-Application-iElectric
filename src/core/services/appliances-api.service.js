import http from "./http-common"

class AppliancesApiService{
    getAll(){
        return http.get("/appliances");
    }

    getById(id){
        return http.get(`/appliances/${id}`);
    }

    getAppliances(id){
        return http.get(`/clients/${ id }/appliances`);
    }
}

export default new AppliancesApiService();
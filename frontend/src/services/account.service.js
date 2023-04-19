import createApiClient from "./api.service";
class AccountService {
    constructor(baseUrl = "/api/accounts") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async addcontact(id,contactid) {
        return (await this.api.put(`/mycontacts/${id}/${contactid}`)).data;
    }
    async removecontact(id,contactid) {
        return (await this.api.delete(`/mycontacts/${id}/${contactid}`)).data;
    }
    async login(data){
        return (await this.api.post(`/login`, data)).data;
    }
    async register(data) {
        return (await this.api.post(`/`,data)).data; 
    }
    
}
export default new AccountService();

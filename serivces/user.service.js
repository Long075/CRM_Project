export class UserService{
    constructor(request){
        this.request = request;
    }

    async createUser(dataUser, token){
        return await this.request.post('/api/users', {
            headers: {Authorization: `Bearer ${token}`},
            data: dataUser
        })
    }

    async getUser(id, token){
        return await this.request.get(`/api/users/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    async getUsers(token){
        return await this.request.get(`/api/users/`, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    async updateUser(dataUser, id, token){
        return await this.request.put(`/api/users/${id}`, {
            headers: {Authorization: `Bearer ${token}`},
            data: dataUser
        })
    }

    async deleteUser(id, token){
        return await this.request.delete(`/api/users/${id}`, {
            headers: {Authorization: `Bearer ${token}`},
        })
    }
}
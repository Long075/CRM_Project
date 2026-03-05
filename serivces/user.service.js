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

    getUser(id, token){
        return this.request.get(`/api/users/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    getUsers(token){
        return this.request.get(`/api/users/`, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    updateUser(dataUser, id, token){
        return this.request.put(`/api/users/${id}`, {
            headers: {Authorization: `Bearer ${token}`},
            data: dataUser
        })
    }

    deleteUser(id, token){
        return this.request.delete(`/api/users/${id}`, {
            headers: {Authorization: `Bearer ${token}`},
        })
    }
}
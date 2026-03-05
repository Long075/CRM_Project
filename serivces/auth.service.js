export class AuthService{
    constructor(request){
        this.request = request;
    }

    login(username, password){
        return this.request.post('/api/login', {
            data: {
                username: username,
                password: password
            }
        })
    }
}
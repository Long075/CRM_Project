export class LoginPage{
    constructor(page) {
        this.page = page;
        this.username = page.locator('#Username');
        this.password = page.locator('#Password');
        this.saleLoginBtn = page.locator('.btn-reg');
        this.manageLoginBtn = page.getByRole('button', { name: 'QUẢN LÝ' });

        this.resetPassFoot = page.getByRole('link', {name: /Quên mật khẩu/i});
        this.email = page.locator('#Email');
        this.resetPassBtn = page.getByRole('button', {name: 'Reset mật khẩu'});
    }

    async login(user, pass) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.manageLoginBtn.click();
    }

    async openForgotPassword(){
        await this.resetPassFoot.click();
    }

    async forgotPassword(email){
        await this.email.fill(email);
        await this.resetPassBtn.click();
    }
}
export class LoginPage{
    constructor(page) {
        this.page = page;
        this.username = page.locator('#Username');
        this.password = page.locator('#Password');
        this.saleLoginBtn = page.locator('.btn-reg');
        this.manageLoginBtn = page.getByRole('button', { name: 'QUẢN LÝ' });
    }

    async login(user, pass) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.manageLoginBtn.click();
    }
}
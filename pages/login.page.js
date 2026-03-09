import { expect } from "playwright/test";

export class LoginPage{
    constructor(page) {
        this.page = page;
        this.username = page.locator('#Username');
        this.password = page.locator('#Password');
        this.saleLoginBtn = page.locator('.btn-reg');
        this.manageLoginBtn = page.getByRole('button', { name: 'QUẢN LÝ' });
        this.errorMessage = page.locator('#p_errmsg');

        this.resetPassFoot = page.getByRole('link', {name: /Quên mật khẩu/i});
        this.email = page.locator('#Email');
        this.resetPassBtn = page.getByRole('button', {name: 'Reset mật khẩu'});
        this.returnLogin = page.getByText('Quay lại Đăng nhập');
        this.infoToEmail = page.getByText('Mật khẩu mới đã được gửi về địa chỉ email bạn cung cấp');

        this.settingIcon = page.locator('a[tooltip="Thiết lập"]');
        this.logOutBtn = page.locator("a[ng-click='logout()']");
    }

    async login(user, pass) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.manageLoginBtn.click();
    }

    async gotoLoginPage(){
        await this.page.goto('https://hvtester.pos365.vn/Signin');
    }

    async verifyLoginSuccess(){
        await expect(this.page).toHaveURL(/#!/);
        await expect(this.page.locator('#navbar', {hasText: 'Tổng quan'})).toBeVisible();
    }

    async openForgotPassword(){
        await this.resetPassFoot.click();
    }

    async forgotPassword(email){
        await this.email.fill(email);
        await this.resetPassBtn.click();
    }

    async verifyError(message){
        await expect(this.errorMessage).toContainText(message);
    }

    async backToLogin(){
        await this.returnLogin.click();
        await expect(this.page).not.toHaveURL(/RequestPassword/);
    }
    
    async sendPassToEmail(){
        await expect(this.infoToEmail).toBeVisible();
    }

    async logOutSuccess(){
        await this.verifyLoginSuccess();
        await this.settingIcon.click();
        await this.logOutBtn.click();
        await expect(this.page).not.toHaveURL(/#!/); 
    }
}
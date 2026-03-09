import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page.js";

const nonExistEmail = 'long@gmail.vn';
const InvalidEmail = 'long';

//Không sử dụng storageState
test.use({ storageState: {cookies: [], origins: []} });

test('Reset Password Valid', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.openForgotPassword();
    await page.pause(); // Dừng để click Captcha
    await loginPage.forgotPassword(process.env.EMAIL);
    await loginPage.sendPassToEmail();
});

test('Reset Password Fail With Not Click Captcha', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.openForgotPassword();
    await loginPage.forgotPassword(process.env.EMAIL);
    await loginPage.verifyError('Mã xác nhận không hợp lệ');
});

test('Reset Password Fail With Non-exist Email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.openForgotPassword();
    await loginPage.forgotPassword(nonExistEmail);
    await loginPage.verifyError('Địa chỉ email không hợp lệ');
});

test('Reset Password Fail With Invalid Email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.openForgotPassword();
    await loginPage.forgotPassword(InvalidEmail);
    await loginPage.verifyError('Địa chỉ email không hợp lệ');
});

test('Reset Password Fail With Empty Email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.openForgotPassword();
    await loginPage.forgotPassword('');
    await loginPage.verifyError('Bạn phải nhập địa chỉ Email');
});

test('Back To Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.openForgotPassword();
    await loginPage.backToLogin();
});
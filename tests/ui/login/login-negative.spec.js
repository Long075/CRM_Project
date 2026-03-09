import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page";

//Không sử dụng storageState
test.use({ storageState: {cookies: [], origins: []} });

const wrongUser = process.env.LOGIN_USERNAME + 'wronguser';
const wrongPass = process.env.LOGIN_PASSWORD + 'wrongpass';
const wrongMessage = /Tên đăng nhập hoặc mật khẩu không hợp lệ/;

test('Login fail with wrong username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.gotoLoginPage();
    await loginPage.login(wrongUser, process.env.LOGIN_PASSWORD);
    await loginPage.verifyError(wrongMessage);
});

test('Login fail with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.LOGIN_USERNAME, wrongPass);
    await loginPage.verifyError(wrongMessage);
});

test('Login fail with empty field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('','');
    await loginPage.verifyError(wrongMessage);
});
import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page";

test('Reset Password Valid', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://hvtester.pos365.vn/Signin');
    await loginPage.openForgotPassword();
    await page.pause();
    await loginPage.forgotPassword(process.env.EMAIL);
    await expect(page.getByText('Mật khẩu mới đã được gửi về địa chỉ email bạn cung cấp')).toBeVisible();
});

test('Reset Password Fail With Not Click Captcha', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://hvtester.pos365.vn/Signin');
    await loginPage.openForgotPassword();
    await loginPage.forgotPassword(process.env.EMAIL);
    await expect(page.locator('#p_errmsg')).toContainText('Mã xác nhận không hợp lệ');
});

test('Reset Password Fail With Non-exist Email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://hvtester.pos365.vn/Signin');
    await loginPage.openForgotPassword();
    await loginPage.forgotPassword('long@gmail.vn');
    await expect(page.locator('#p_errmsg')).toContainText('Địa chỉ email không hợp lệ');
});

test('Reset Password Fail With Invalid Email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://hvtester.pos365.vn/Signin');
    await loginPage.openForgotPassword();
    await loginPage.forgotPassword('long');
    await expect(page.locator('#p_errmsg')).toContainText('Địa chỉ email không hợp lệ');
});

test('Reset Password Fail With Empty Email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://hvtester.pos365.vn/Signin');
    await loginPage.openForgotPassword();
    await loginPage.forgotPassword('');
    await expect(page.locator('#p_errmsg')).toContainText('Bạn phải nhập địa chỉ Email');
});

test('Back to login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://hvtester.pos365.vn/Signin');
    await loginPage.openForgotPassword();
    await page.getByText('Quay lại Đăng nhập').click();
    await expect(page).not.toHaveURL(/RequestPassword/);
});
import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page";

test.describe.configure({ mode: 'serial' });

test('Login fail with wrong username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://hvtester.pos365.vn/Signin');
    await loginPage.login(process.env.LOGIN_USERNAME + 'wronguser', process.env.LOGIN_PASSWORD);
    await expect(page.locator('#p_errmsg')).toContainText('không hợp lệ');
});

test('Login fail with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://hvtester.pos365.vn/Signin');
    await loginPage.login(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD + 'wrongpass');
    await expect(page.locator('#p_errmsg')).toContainText('không hợp lệ');
});

test('Login fail with empty field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://hvtester.pos365.vn/Signin');
    await loginPage.login('','');
    await expect(page.locator('#p_errmsg')).toContainText('không hợp lệ');
});
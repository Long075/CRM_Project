import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page";

test('Login success', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://hvtester.pos365.vn/Signin');
    await loginPage.login(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD);
    await expect(page).toHaveURL(/Dashboard/);
    await expect(page.locator('#navbar', {hasText: 'Tổng quan'})).toBeVisible();
});
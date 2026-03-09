import {test} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page.js";

//Không sử dụng storageState
test.use({ storageState: {cookies: [], origins: []} });

test('Login Success', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD);
    await loginPage.verifyLoginSuccess();
});


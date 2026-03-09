import {test} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page.js";

test('Logout Success', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.logOutSuccess();
});
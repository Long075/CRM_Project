import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page";
import { CustomerPage } from '../../../pages/customer.page';

test('Delete Customer Success', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const customerPage = new CustomerPage(page);

    await loginPage.gotoLoginPage();
    await customerPage.goToCustomerMenu();
    await customerPage.checkCustomerPage();
    await customerPage.deleteCustomer(page, process.env.ID_CUSTOMER_DELETE);
    await customerPage.checkToastMessageSuccess();
});
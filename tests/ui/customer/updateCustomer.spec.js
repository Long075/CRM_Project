import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page";
import { CustomerPage } from '../../../pages/customer.page';
import { validCustomer, invalidCustomers } from '../../../utils/customer.helper';

test.only('Update Customer Success', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const customerPage = new CustomerPage(page);

    await loginPage.gotoLoginPage();
    await customerPage.goToCustomerMenu();
    await customerPage.checkCustomerPage();
    await customerPage.updateCustomerMenu(page, process.env.ID_CUSTOMER_UPDATE);

    await customerPage.createCustomerForm(validCustomer);
    await customerPage.checkToastMessageSuccess();
});

for(const data of invalidCustomers){
    test(`Update Customer fail - ${data.case}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const customerPage = new CustomerPage(page);
        await loginPage.gotoLoginPage();
        await customerPage.goToCustomerMenu();
        await customerPage.checkCustomerPage();
        await customerPage.updateCustomerMenu();
        await customerPage.createCustomerForm(data);
        await customerPage.checkToastMessageError();
    });
}
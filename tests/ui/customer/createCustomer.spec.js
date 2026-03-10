import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page";
import { CustomerPage } from '../../../pages/customer.page';
import { validCustomer, invalidCustomers } from '../../../utils/customer.helper';

test('Create Customer Success', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const customerPage = new CustomerPage(page);

    await loginPage.gotoLoginPage();
    await customerPage.goToCustomerMenu();
    await customerPage.checkCustomerPage();
    await customerPage.addCustomerMenu();
    await customerPage.createCustomerForm(validCustomer);
    await customerPage.checkToastMessageSuccess();
});

for(const data of invalidCustomers){
    test(`Create Customer fail - ${data.case}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const customerPage = new CustomerPage(page);
        await loginPage.gotoLoginPage();
        await customerPage.goToCustomerMenu();
        await customerPage.checkCustomerPage();
        await customerPage.addCustomerMenu();
        await customerPage.createCustomerForm(data);
        await customerPage.checkToastMessageError();
    });
}
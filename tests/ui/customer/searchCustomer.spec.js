import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page";
import { CustomerPage } from '../../../pages/customer.page';

let customerPage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    customerPage = new CustomerPage(page);

    await loginPage.gotoLoginPage();
    await customerPage.goToCustomerMenu();
    await customerPage.checkCustomerPage();

});

test('Search Customer Success With ID', async ({ page }) => {
    await customerPage.searchCustomer(process.env.ID_CUSTOMER_SEARCH);
    await customerPage.checkExistData(process.env.ID_CUSTOMER_SEARCH);
});

test('Search Customer Success With Name', async ({ page }) => {
    await customerPage.searchCustomer(process.env.NAME_CUSTOMER_SEARCH);
    await customerPage.checkExistData(process.env.NAME_CUSTOMER_SEARCH);
});

test('Search Customer Success With Phone', async ({ page }) => {
    await customerPage.searchCustomer(process.env.PHONE_CUSTOMER_SEARCH);
    await customerPage.checkExistData(process.env.PHONE_CUSTOMER_SEARCH);
});

test('Search Customer Fail With Non-ID', async ({ page }) => {
    await customerPage.searchCustomer(process.env.NON_ID_CUSTOMER);
    await customerPage.checkNotExistData(process.env.NON_ID_CUSTOMER);
});

test('Search Customer Fail With Non-Name', async ({ page }) => {
    await customerPage.searchCustomer(process.env.NON_NAME_CUSTOMER);
    await customerPage.checkNotExistData(process.env.NON_NAME_CUSTOMER);
});

test('Search Customer Fail With Non-Phone', async ({ page }) => {
    await customerPage.searchCustomer(process.env.NON_PHONE_CUSTOMER);
    await customerPage.checkNotExistData(process.env.NON_PHONE_CUSTOMER);
});
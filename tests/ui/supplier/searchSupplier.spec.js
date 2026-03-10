import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page";
import { SupplierPage } from '../../../pages/supplier.page';

let supplierPage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    supplierPage = new SupplierPage(page);

    await loginPage.gotoLoginPage();
    await supplierPage.goToSupplierMenu();
    await supplierPage.checkSupplierPage();

});

test('Search Supplier Success With ID', async ({ page }) => {
    await supplierPage.searchSupplier(process.env.ID_SUPPLIER_SEARCH);
    await supplierPage.checkExistData(process.env.ID_SUPPLIER_SEARCH);
});

test('Search Supplier Success With Name', async ({ page }) => {
    await supplierPage.searchSupplier(process.env.NAME_SUPPLIER_SEARCH);
    await supplierPage.checkExistData(process.env.NAME_SUPPLIER_SEARCH);
});

test('Search Supplier Success With Phone', async ({ page }) => {
    await supplierPage.searchSupplier(process.env.PHONE_SUPPLIER_SEARCH);
    await supplierPage.checkExistData(process.env.PHONE_SUPPLIER_SEARCH);
});

test('Search Supplier Fail With Non-ID', async ({ page }) => {
    await supplierPage.searchSupplier(process.env.NON_ID_SUPPLIER);
    await supplierPage.checkNotExistData(process.env.NON_ID_SUPPLIER);
});

test('Search Supplier Fail With Non-Name', async ({ page }) => {
    await supplierPage.searchSupplier(process.env.NON_NAME_SUPPLIER);
    await supplierPage.checkNotExistData(process.env.NON_NAME_SUPPLIER);
});

test('Search Supplier Fail With Non-Phone', async ({ page }) => {
    await supplierPage.searchSupplier(process.env.NON_PHONE_SUPPLIER);
    await supplierPage.checkNotExistData(process.env.NON_PHONE_SUPPLIER);
});
import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page";
import { SupplierPage } from '../../../pages/supplier.page';
import { validSupplier, invalidSuppliers } from '../../../utils/supplier.helper';

test('Create Supplier Success', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const supplierPage = new SupplierPage(page);

    await loginPage.gotoLoginPage();
    await supplierPage.goToSupplierMenu();
    await supplierPage.checkSupplierPage();
    await supplierPage.addSupplierMenu();
    await supplierPage.createSupplierForm(validSupplier);
    await supplierPage.checkToastMessageSuccess();
});

for(const data of invalidSuppliers){
    test(`Create supplier fail - ${data.case}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const supplierPage = new SupplierPage(page);
        await loginPage.gotoLoginPage();
        await supplierPage.goToSupplierMenu();
        await supplierPage.checkSupplierPage();
        await supplierPage.addSupplierMenu();
        await supplierPage.createSupplierForm(data);
        await supplierPage.checkToastMessageError();
    });
}
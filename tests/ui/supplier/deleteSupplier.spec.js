import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/login.page";
import { SupplierPage } from '../../../pages/supplier.page';

test('Delete Supplier Success', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const supplierPage = new SupplierPage(page);

    await loginPage.gotoLoginPage();
    await supplierPage.goToSupplierMenu();
    await supplierPage.checkSupplierPage();
    await supplierPage.deleteSupplier(page, process.env.ID_SUPPLIER_DELETE);
    await supplierPage.checkToastMessageSuccess();
});
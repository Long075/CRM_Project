import { expect } from "playwright/test";

export class SupplierPage{
    constructor(page){
        this.page = page;
        
        this.dropdownSupplier = page.locator("//a[contains(@class,'dropdown-toggle') and contains(.,'Đối tác')]");
        this.supplierMenu = page.locator("//a[@ng-href='/#!/Suppliers']");
        this.addSupplierBtn = page.locator("//button[@ng-click='addNewButton()']");
        this.saveSupplierBtn = page.locator("//button[@ng-click='save()']");
        this.returnSupplierMenuBtn = page.locator("//button[@ng-click='backwardButton()']");

        this.title = page.locator("#left-filter");
        this.fields = [
            page.locator("th[data-title='Mã nhà cung cấp']"),
            page.locator("th[data-title='Tên']"),
            page.locator("th[data-title='Điện thoại']"),
            page.locator("th[data-title='MST']"),
            page.locator("th[data-title='Tổng giao dịch']"),
            page.locator("th[data-title='Dư nợ']")
        ];
        this.addBtn = page.getByRole('button', {name: /Thêm mới/})
        this.exportBtn = page.getByRole('button', {name: /Xuất ra file/})
        this.importBtn = page.getByRole('button', {name: /Import/})

        this.identifyInput = page.locator("input[ng-model='partner.IdentifyNo']");
        this.nameInput = page.locator("input[ng-model='partner.Name']");
        this.debtInput = page.locator("input[ng-model='bl.Debt']");
        this.phoneInput = page.locator("input[ng-model='partner.Phone']");
        this.emailInput = page.locator("input[ng-model='partner.Email']");

        this.toastMess = page.locator('.k-notification-wrap');
        this.successCreate = page.getByText(/thành công/);
        this.faildCreate = page.getByText(/không hợp lệ/);
    }

    async addSupplierMenu(){
        await this.addSupplierBtn.click();
    }

    async checkSupplierPage(){
        await expect(this.title).toHaveText("Nhà cung cấp");
        for(const field of this.fields){
            await expect(field).toBeVisible();
        }
        await expect(this.addBtn).toBeVisible();
        await expect(this.exportBtn).toBeVisible();
        await expect(this.importBtn).toBeVisible();
    }

    async goToSupplierMenu(){
        await this.dropdownSupplier.click();
        await this.supplierMenu.click();
    }

    async createSupplierForm(data){
        if(data.identify)
            await this.identifyInput.fill(data.identify);
        if(data.name)
            await this.nameInput.fill(data.name);
        if(data.phone)
            await this.phoneInput.fill(data.phone);
        if(data.email)
            await this.emailInput.fill(data.email);
        if(data.debt)
            await this.debtInput.fill(data.debt);
        await this.saveSupplierBtn.click();
    }

    async checkToastMessage(){
        await expect(this.toastMess).toBeVisible();
        await expect(this.toastMess).toBeHidden();
    }
}
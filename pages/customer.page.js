import { expect } from "playwright/test";

export class CustomerPage{
    constructor(page){
        this.page = page;
        
        this.dropdownCustomer = page.locator("//a[contains(@class,'dropdown-toggle') and contains(.,'Đối tác')]");
        this.customerMenu = page.locator("//a[@ng-href='/#!/Customers']");
        this.addCustomerBtn = page.locator("//button[@ng-click='addNewButton()']");
        this.saveCustomerBtn = page.locator("//button[@ng-click='save()']");
        this.returnCustomerMenuBtn = page.locator("//button[@ng-click='backwardButton()']");

        this.title = page.locator("#left-filter");
        this.supTitle = page.locator("h1[ng-bind='$root.title']");
        this.fields = [
            page.locator("th[data-title='Mã khách hàng']"),
            page.locator("th[data-title='Tên']"),
            page.locator("th[data-title='Điện thoại']"),
            page.locator("th[data-title='Tổng giao dịch']"),
            page.locator("th[data-title='Điểm thưởng']"),
            page.locator("th[data-title='Dư nợ']")
        ];
        this.addBtn = page.getByRole('button', {name: /Thêm mới/})
        this.exportBtn = page.getByRole('button', {name: /Xuất ra file/})
        this.importBtn = page.getByRole('button', {name: /Import/})

        this.identifyInput = page.locator("input[ng-model='partner.IdentifyNo']");
        this.nameInput = page.locator("input[ng-model='partner.Name']");
        this.debtInput = page.locator("input[ng-model='bl.Debt']");
        this.phoneInput = page.locator("input[ng-model='partner.Phone']");
        this.pointInput = page.locator("input[ng-model='partner.Point']")
        this.emailInput = page.locator("input[ng-model='partner.Email']");

        this.toastMessSucess = page.locator(".k-notification-wrap span[title='success']");
        this.toastMessError = page.locator(".k-notification-wrap span[title='error']");
        this.successCreate = page.getByText(/thành công/);
        this.faildCreate = page.getByText(/không hợp lệ/);

        this.updateBtn = page.locator("button[ng-click='updateButton(dataItem.Id)']");

        this.deleteBtn = page.locator("button[ng-click='delete(dataItem)']");
        this.confirmDelete = page.locator(".modal-content", {hasText: /Xác nhận xóa dữ liệu/})
        this.successDelete = page.locator("button[data-ng-click='modalOptions.ok();']");

        this.searchByName = page.locator("input[ng-enter='filterByName()']");
        this.searchByMonth = page.locator('#dropMain');
        this.tableData = page.locator("[role='treegrid']");
    }

    async addCustomerMenu(){
        await this.addCustomerBtn.click();
        await expect(this.supTitle).toHaveText(/Thêm mới/);
    }

    async updateCustomerMenu(page, data){
        await page.locator('tr.k-master-row', {hasText: data}).click();
        await this.updateBtn.click();
        await expect(this.supTitle).toHaveText(/Cập nhật/);
    }

    async deleteCustomer(page, data){
        await page.locator('tr.k-master-row', {hasText: data}).click();
        await this.deleteBtn.click();
        await expect(this.confirmDelete).toBeVisible();
        await this.successDelete.click();
    }

    async searchCustomer(data){
        await this.searchByName.fill(data);
        await this.searchByMonth.selectOption({ label: 'Tháng 1' });
        await this.searchByName.press('Enter');
    }

    async checkCustomerPage(){
        await expect(this.title).toHaveText("Khách hàng");
        for(const field of this.fields){
            await expect(field).toBeVisible();
        }
        await expect(this.addBtn).toBeVisible();
        await expect(this.exportBtn).toBeVisible();
        await expect(this.importBtn).toBeVisible();
    }

    async goToCustomerMenu(){
        await this.dropdownCustomer.click();
        await this.customerMenu.click();
    }

    async createCustomerForm(data){
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
        if(data.point)
            await this.pointInput.fill(data.point);
        await this.saveCustomerBtn.click();
    }

    async checkToastMessageSuccess(){
        await expect(this.toastMessSucess).toBeVisible();
        await expect(this.toastMessSucess).toBeHidden();
    }

    async checkToastMessageError(){
        await expect(this.toastMessError).toBeVisible();
        await expect(this.toastMessError).toBeHidden();
    }

    async checkExistData(data){
        await expect(this.tableData).toContainText(data);
    }

    async checkNotExistData(data){
        await expect(this.tableData).not.toContainText(data);
    }
}
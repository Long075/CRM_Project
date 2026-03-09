export const validSupplier = {
    identify: "0909123123123",
    name: "Supplier Test",
    phone: "0987654321",
    email: "supplier@test.com",
    debt: "123"
};

export const invalidSuppliers = [
    {
        identify: "indentifysupper",
        name: "Supplier Test",
        phone: "0987654321",
        email: "supplier@test.com",
        debt: "123",
        case: "InvalidIdentify"
    },
    {
        identify: "0909123123",
        name: "",
        phone: "0987654321",
        email: "supplier@test.com",
        debt: "123",
        case: "Name empty"
    },
    {
        identify: "0909123123",
        name: "Supplier Test",
        phone: "",
        email: "supplier@test.com",
        debt: "123",
        case: "Phone empty"
    },
    {
        identify: "0909123123123",
        name: "Supplier Test",
        phone: "0987654321",
        email: "suppliertest.com",
        debt: "123",
        case: "Invalid Email"
    }
]
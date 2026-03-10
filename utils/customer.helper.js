export const validCustomer = {
    identify: "079123456666",
    name: "Customer Test",
    phone: "0987654321",
    email: "customer@test.com",
    debt: "123",
    point: "5000"
};

export const invalidCustomers = [
    {
        identify: "â12312",
        name: "Customer Test",
        phone: "0987654321",
        email: "customer@test.com",
        debt: "123",
        point: "5000",
        case: "InvalidIdentify"
    },
    {
        identify: "0909123123",
        name: "",
        phone: "0987654321",
        email: "customer@test.com",
        debt: "123",
        point: "5000",
        case: "Name empty"
    },
    {
        identify: "0909123123",
        name: "Customer Test",
        phone: "",
        email: "customer@test.com",
        debt: "123",
        point: "5000",
        case: "Phone empty"
    },
    {
        identify: "0909123123123",
        name: "Customer Test",
        phone: "0987654321",
        email: "customertest.com",
        debt: "123",
        point: "5000",
        case: "Invalid Email"
    }
]
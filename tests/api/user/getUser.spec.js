import {test, expect} from '@playwright/test';
import {UserService} from '../../../serivces/user.service.js';
import {dataCreate, getIDByUsername} from '../../../utils/user.helper.js';
import {getSchema} from '../../../schema/user_schema.js';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';

const tokenData = JSON.parse(fs.readFileSync('token.json', 'utf-8'));
const token = tokenData.token;
const ajv = new Ajv();
addFormats(ajv);

const userCre = dataCreate();

test('Get 1 User Success', async({request}) => {
    const userService = new UserService(request);
    const validateGetSchema = ajv.compile(getSchema);

    //Tạo user mới và lấy id user
    await userService.createUser(userCre, token);
    const idUser = await getIDByUsername(userService, userCre.user.username, token);

    const startTime = performance.now();
    const getRes = await userService.getUser(idUser, token);
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    const body = await getRes.json();

    expect(body.status).toContain('success');
    expect(getRes.status()).toBe(200); //Thêm thành công là 201
    expect(getRes.headers()['content-type']).toContain('application/json');
    expect(validateGetSchema(body)).toBe(true);
    expect(responseTime).toBeLessThan(3000);

    await userService.deleteUser(idUser,token);
})

test('Get All User', async ({request}) => {
    const userService = new UserService(request);
    const validateGetSchema = ajv.compile(getSchema);

    const startTime = performance.now();
    const getRes = await userService.getUsers(token);
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    const body = await getRes.json();

    expect(body.status).toContain('success');
    expect(getRes.status()).toBe(200);
    expect(getRes.headers()['content-type']).toContain('application/json');

    expect(validateGetSchema(body)).toBe(true);
    expect(responseTime).toBeLessThan(20000);

    // Dùng khi lỗi schema, phát hiện user nào bị lỗi
    // validate.errors.forEach(err => {
    //     const index = err.instancePath.split("/")[3];
    //     console.log("User lỗi:", body.data.users[index]);
    // });
})
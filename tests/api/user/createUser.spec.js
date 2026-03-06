import {test, expect} from '@playwright/test';
import {UserService} from '../../../serivces/user.service.js';
import {dataCreate, getIDByUsername} from '../../../utils/user.helper.js';
import {creSchema} from '../../../schema/user_schema.js';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';

const tokenData = JSON.parse(fs.readFileSync('token.json', 'utf-8'));
const token = tokenData.token;
const ajv = new Ajv();
addFormats(ajv);

const userCre = dataCreate();

test('Create User Success', async({request}) => {
    const userService = new UserService(request);
    const validateCreSchema = ajv.compile(creSchema);

    const startTime = performance.now();
    const createRes = await userService.createUser(userCre, token);
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    const body = await createRes.json();

    expect(body.status).toContain('success');
    expect(createRes.status()).toBe(200); //Thêm thành công là 201
    expect(createRes.headers()['content-type']).toContain('application/json');
    expect(validateCreSchema(body)).toBe(true);
    expect(responseTime).toBeLessThan(5000);

    const idUser = await getIDByUsername(userService, userCre.user.username, token);

    //Xoá user vừa tạo
    await userService.deleteUser(idUser, token);
})
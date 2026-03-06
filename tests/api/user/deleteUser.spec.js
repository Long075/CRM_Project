import {test, expect} from '@playwright/test';
import {UserService} from '../../../serivces/user.service.js';
import {dataCreate, getIDByUsername} from '../../../utils/user.helper.js';
import {delSchema} from '../../../schema/user_schema.js';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';

const tokenData = JSON.parse(fs.readFileSync('token.json', 'utf-8'));
const token = tokenData.token;
const ajv = new Ajv();
addFormats(ajv);

const userCre = dataCreate();

test('Delete User Success', async({request}) => {
    const userService = new UserService(request);
    const validateGetSchema = ajv.compile(delSchema);

    //Tạo user mới và lấy id user
    await userService.createUser(userCre, token);
    const idUser = await getIDByUsername(userService, userCre.user.username, token);

    const startTime = performance.now();
    const delRes = await userService.deleteUser(idUser, token);
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    const body = await delRes.json();

    expect(body.status).toContain('success');
    expect(delRes.status()).toBe(200); //Xóa thành công là 204
    expect(delRes.headers()['content-type']).toContain('application/json');
    expect(validateGetSchema(body)).toBe(true);
    expect(responseTime).toBeLessThan(3000);
})
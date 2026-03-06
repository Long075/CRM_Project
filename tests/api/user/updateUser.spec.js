import {test, expect} from '@playwright/test';
import {UserService} from '../../../serivces/user.service.js';
import {dataCreate, dataUpdate, getIDByUsername} from '../../../utils/user.helper.js';
import {updateSchema} from '../../../schema/user_schema.js';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';

const tokenData = JSON.parse(fs.readFileSync('token.json', 'utf-8'));
const token = tokenData.token;
const ajv = new Ajv();
addFormats(ajv);

const userCre = dataCreate();
const userUpd = dataUpdate(userCre.user.username);

test('Update User Success', async({request}) => {
    const userService = new UserService(request);
    const validateGetSchema = ajv.compile(updateSchema);

    //Tạo user mới và lấy id user
    await userService.createUser(userCre, token);
    const idUser = await getIDByUsername(userService, userCre.user.username, token);

    const startTime = performance.now();
    const updRes = await userService.updateUser(userUpd, idUser, token);
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    const body = await updRes.json();

    expect(body.status).toContain('success');
    expect(updRes.status()).toBe(200); //Chỉnh sửa thành công là 204 hoặc 200
    expect(updRes.headers()['content-type']).toContain('application/json');
    expect(validateGetSchema(body)).toBe(true);
    expect(responseTime).toBeLessThan(3000);

    await userService.deleteUser(idUser,token);
})
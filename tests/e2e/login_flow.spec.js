import {test, expect} from '@playwright/test';
import {UserService} from '../../serivces/user.service.js';
import {dataCreate, dataUpdate, dataInvalid} from '../../utils/data.helper.js';
import fs from 'fs';

import {getSchema, updateSchema} from '../../schema/user_schema.js';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';


const tokenData = JSON.parse(fs.readFileSync('token.json', 'utf-8'));
const token = tokenData.token;
const ajv = new Ajv();
addFormats(ajv);

test('CRUD Success', async({request}) => {
    const userService = new UserService(request);
    const validateGetSchema = ajv.compile(getSchema);
    const validateUpdateSchema = ajv.compile(updateSchema);

    //Tạo user mới và lưu username để lấy id
    const userCre = dataCreate();
    const createRes = await userService.createUser(userCre, token);
    const body1 = await createRes.json();
    expect(body1.status).toContain('success');
    expect(createRes.headers()['content-type']).toContain('application/json');
    expect(createRes.status()).toBe(200); //Thêm thành công là 201
    const usernameCreated = userCre.user.username;

    //Thêm data invalid không thành công
    for(const u of dataInvalid()){
        const userInvalid = await userService.createUser(u, token);
        const body0 = await userInvalid.json();
        expect(body0.status).toContain('error');
    };

    //Lấy id của user vừa tạo
    const getAllRes = await userService.getUsers(token);
    expect(getAllRes.headers()['content-type']).toContain('application/json');
    const body2 = await getAllRes.json();
    const User = (body2.data.users).find(u => u.username === usernameCreated);
    if (!User) {
        throw new Error(`❌ Không tìm thấy user: ${usernameCreated}`);
    }
    const idUser = User.id;

    //Lấy thông tin user vừa tạo
    const get1Res = await userService.getUser(idUser, token);
    expect(get1Res.headers()['content-type']).toContain('application/json');
    const body3 = await get1Res.json();
    expect(body3.data.user.username).toBe(usernameCreated);
    expect(body3.data.user.email).toBe(userCre.user.email);
    expect(get1Res.status()).toBe(200);

    expect(validateGetSchema(body3)).toBe(true);

    //Chỉnh sửa thông tin user
    const userUpd = dataUpdate(usernameCreated);
    const putRes = await userService.updateUser(userUpd, idUser, token);
    expect(putRes.headers()['content-type']).toContain('application/json');
    const body4 = await putRes.json();
    expect(body4.status).toContain('success');
    expect(putRes.status()).toBe(200);

    expect(validateUpdateSchema(body4)).toBe(true);

    //Kiểm tra thông tin sau khi chỉnh sửa
    const get1Res1 = await userService.getUser(idUser, token);
    const body5 = await get1Res1.json();
    expect(body5.data.user.name).toBe(userUpd.user.name);
    expect(body5.data.user.email).toBe(userUpd.user.email);

    //Xóa thông tin user
    const delRes = await userService.deleteUser(idUser, token);
    expect(delRes.headers()['content-type']).toContain('application/json');
    const body6 = await delRes.json();
    expect(body6.status).toContain('success');
    expect(delRes.status()).toBe(200); //Xoá thành công là 204

    expect(validateUpdateSchema(body6)).toBe(true);

    //Kiểm tra user còn tồn tại không
    const get1Res2 = await userService.getUser(idUser, token);
    const body7 = await get1Res2.json();
    expect(body7.status).toContain('error');
    expect(get1Res2.status()).toBe(200); //Không tìm thấy là 404
})
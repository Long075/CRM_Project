import {test, expect} from '@playwright/test';
import {AuthService} from '../../serivces/auth.service.js';

test('Login Success', async({request}) => {
    const authService = new AuthService(request);
    const response = await authService.login(process.env.API_USERNAME, process.env.API_PASSWORD);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.access_token).toBeTruthy();
})

test('Login Invalid Username', async({request}) => {
    const authService = new AuthService(request);
    const response = await authService.login(process.env.API_WRONG_USERNAME, process.env.API_PASSWORD);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toContain('error');
})

test('Login Invalid Password', async({request}) => {
    const authService = new AuthService(request);
    const response = await authService.login(process.env.API_USERNAME, process.env.API_WRONG_PASSWORD);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toContain('error');
})
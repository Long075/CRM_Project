import { request, chromium } from '@playwright/test';
import fs from 'fs';

import { LoginPage } from './pages/login.page';

// async function globalSetup() {
//   const context = await request.newContext();
//   const res = await context.post(`${process.env.BASE_URL}/api/login`, {
//     data: {
//       username: process.env.API_USERNAME,
//       password: process.env.API_PASSWORD
//     }
//   });
//   const body = await res.json();
//   if (body.status == "error"){
//     throw new Error('Login thất bại ở Global setup');
//   }

//   const token = body.data.access_token;
//   fs.writeFileSync('token.json', JSON.stringify({ token }));
// }

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.login(process.env.LOGIN_USERNAME,process.env.LOGIN_PASSWORD);
  await loginPage.verifyLoginSuccess();
  
  //Lưu SessionStorage, Cookies, LocalStorage để không login lại
  await page.context().storageState({path: 'playwright/.auth/user.json'});
  await browser.close();
}

export default globalSetup;
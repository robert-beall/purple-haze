import { test as setup } from '@playwright/test';
import 'dotenv/config';

const authFile = './playwright/.auth/user.json';

setup('login', async ({ page }) => {
    await page.goto('/login');

    const formSubmit = page.locator('button[type="submit"]');
    const usernameInput = page.getByRole('textbox', {name: 'username'});
    const passwordInput = page.getByRole('textbox', {name: 'password'});

    await usernameInput.fill(process.env.USERNAME ?? '');
    await passwordInput.fill(process.env.PASSWORD ?? '');

    await formSubmit.click();

    // await page.
    await page.waitForResponse(`${process.env.BACKEND_URL}/auth/login`);

    await page.context().storageState({ path: authFile });
});
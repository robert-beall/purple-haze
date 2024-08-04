import { test, expect } from '@playwright/test';
import 'dotenv/config';

test('login', async ({ page }) => {
    await page.goto(`${process.env.FRONTEND_URL}/login`);

    const formSubmit = page.locator('button[type="submit"]');
    const usernameInput = page.getByRole('textbox', {name: 'username'});
    const passwordInput = page.getByRole('textbox', {name: 'password'});

    await usernameInput.fill(process.env.USERNAME ?? '');
    await passwordInput.fill(process.env.PASSWORD ?? '');

    await formSubmit.click();

    // await page.
    await page.waitForResponse(`${process.env.BACKEND_URL}/auth/login`);

    await page.waitForURL(`${process.env.FRONTEND_URL}`);

    const token = await page.evaluate(() => localStorage.getItem('purple-token'));
    expect(token).not.toBeNull();
});
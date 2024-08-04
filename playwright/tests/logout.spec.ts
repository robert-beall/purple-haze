import { expect, test } from '@playwright/test';
import 'dotenv/config';

test('logout', async ({ page }) => {
    await page.goto(`${process.env.FRONTEND_URL}`);

    let token = await page.evaluate(() => localStorage.getItem('purple-token'));
    expect(token).not.toBeNull();

    await page.goto(`${process.env.FRONTEND_URL}/logout`);

    await page.waitForURL(`${process.env.FRONTEND_URL}/login`);

    token = await page.evaluate(() => localStorage.getItem('purple-token'));
    expect(token).toBeNull();
})
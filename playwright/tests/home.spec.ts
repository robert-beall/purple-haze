import { test } from '@playwright/test';
import 'dotenv/config';

test('title', async ({ page }) => {
    await page.goto(`${process.env.FRONTEND_URL}`);
});
import { expect, test } from '@playwright/test';
import 'dotenv/config';

/**
 * Tests for page content.
 */
test.describe(() => {
    /**
     * A simple test for testing the page heading.
     */
    test('heading', async ({ page }) => {
        await page.goto(`${process.env.FRONTEND_URL}`);
    
        const heading = page.getByTestId('heading');
        expect(await heading.textContent()).toBe('Purple Haze');
        expect(heading).toBeVisible();
    });

    /**
     * A simple test for testing the page subheading.
     */
    test('subheading', async ({ page }) => {
        await page.goto(`${process.env.FRONTEND_URL}`);
    
        const subheading = page.getByTestId('subheading');
        expect(await subheading.textContent()).toBe('A Simple and Fearless Playwright Testbed');
        expect(subheading).toBeVisible();
    });
});

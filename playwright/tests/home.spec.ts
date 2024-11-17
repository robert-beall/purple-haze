import { expect, test } from '@playwright/test';
import 'dotenv/config';

test.beforeEach(async ({ page }) => {
    // got to the home page before each test
    await page.goto('/');
})

/**
 * Test page title
 */
test('Page Title', async ({page}) => {
    // Confirm page title
    await expect(page).toHaveTitle('Purple Haze');
});

/**
 * Tests for page content.
 */
test.describe('Page Content', () => {
    /**
     * A simple test for testing the page heading.
     */
    test('heading', async ({ page }) => {
        const heading = page.getByTestId('heading');
        expect(await heading.textContent()).toBe('Purple Haze');
        expect(heading).toBeVisible();
    });

    /**
     * A simple test for testing the page subheading.
     */
    test('subheading', async ({ page }) => {
        const subheading = page.getByTestId('subheading');
        expect(await subheading.textContent()).toBe('A Simple and Fearless Playwright Testbed');
        expect(subheading).toBeVisible();
    });
});

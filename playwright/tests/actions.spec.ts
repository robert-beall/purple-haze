import { expect, test } from '@playwright/test';
import 'dotenv/config';

test('Test with Basic Action and Assertion', async ({ page }) => {
    // navigate to the page
    await page.goto('/actions');

    // get the button and click it
    await page.getByRole('button', { name: 'Click Me!'}).click();

    // assert that the message is shown on the page after clicking
    expect(page.getByText('Surprise!')).toBeVisible();
});
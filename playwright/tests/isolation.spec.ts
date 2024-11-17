import { expect, test } from '@playwright/test';
import 'dotenv/config';

test('Click One', async ({page}) => {
    // navigate to the page
    await page.goto('/isolation');

    // get the button and click it
    await page.getByTestId('button1').click();

    // the result of "Click One!" should be visible
    expect(page.getByText('TADA!')).toBeVisible();

    // the result of "Click Two!" should not be visible
    expect(page.getByText('WHOO HOO!')).not.toBeVisible();
});

test('Click Two', async ({page}) => {
    // navigate to the page
    await page.goto('/isolation');

    // get the button and click it
    await page.getByTestId('button2').click();

    // the result of "Click One!" should not be visible
    expect(page.getByText('TADA!')).not.toBeVisible();

    // the result of "Click Two!" should be visible
    expect(page.getByText('WHOO HOO!')).toBeVisible();
});
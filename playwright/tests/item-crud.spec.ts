import { faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test";
import 'dotenv/config';

// All tests should be run sequentially in order
test.describe.configure({ mode: 'serial' });

const objGenerator = () => {
    return {
        name: faker.commerce.productName(),
        cost: faker.number.float({min: 0, max: 100, fractionDigits: 2 }),
        weight: faker.number.float({min: 0, max: 1000, fractionDigits: 3 }),
        category: faker.helpers.arrayElement(['FOOD', 'CLEANING', 'HARDWARE']),
    };
}

let obj = objGenerator();

test.beforeEach(async ({ page }) => {
    await page.goto('/items');
});

test('add', async ({ page }) => {
    const datatable = page.getByTestId('datatable');
    
    // filter datatable with object values
    await page.getByTestId('name-filter').locator('input').fill(obj.name);
    await page.getByTestId('cost-filter').locator('input').fill(obj.cost.toString());
    await page.getByTestId('weight-filter').locator('input').fill(obj.weight.toString());
    await page.getByTestId('category-filter').locator('input').fill(obj.category);
    await page.waitForTimeout(1000);

    // ensure no data rows exist
    const rows = datatable.locator('tbody > tr');
    expect((await rows.all()).length).toBe(1);
    expect(rows.first().locator('td')).toHaveText('No available options');

    // click add button and ensure form is visible
    await page.getByTestId('item-add').click();
    const form = page.getByTestId('item-form');
    expect(form).toBeVisible();
    await page.waitForTimeout(100);

    // fill the form
    await form.locator('[name="name"]').fill(obj.name);
    await form.locator('[name="cost"]').fill(obj.cost.toString());
    await form.locator('[name="weight"]').fill(obj.weight.toString());
    await form.locator('[name="category"]').selectOption(obj.category);

    const submit = form.locator('[type="submit"]');
    expect(submit).toBeVisible();

    await submit.click();

    const response = await page.waitForResponse(`${process.env.BACKEND_URL}/items`);
    expect(response.status()).toBe(201);
});

test('edit', async ({ page }) => {
    const editObj = objGenerator();
    const datatable = page.getByTestId('datatable');
    
    // filter datatable with object values
    await page.getByTestId('name-filter').locator('input').fill(obj.name);
    await page.getByTestId('cost-filter').locator('input').fill(obj.cost.toString());
    await page.getByTestId('weight-filter').locator('input').fill(obj.weight.toString());
    await page.getByTestId('category-filter').locator('input').fill(obj.category);
    await page.waitForTimeout(1000);

    // ensure one data row exists matching our added object
    const rows = datatable.locator('tbody > tr');
    expect((await rows.all()).length).toBe(1);
    expect(rows.first()).toContainText(obj.name);
    expect(rows.first()).toContainText(obj.cost.toString());
    expect(rows.first()).toContainText(obj.weight.toString());
    expect(rows.first()).toContainText(obj.category);

    const rowButton = datatable.locator('tbody > tr > td > button');
    expect(rowButton).toBeVisible();
    await rowButton.click();

    // click add button and ensure form is visible
    await page.getByTestId(/item-edit-.*/).click();
    const form = page.getByTestId('item-form');
    expect(form).toBeVisible();
    await page.waitForTimeout(100);

    // fill the form
    await form.locator('[name="name"]').fill(editObj.name);
    await form.locator('[name="cost"]').fill(editObj.cost.toString());
    await form.locator('[name="weight"]').fill(editObj.weight.toString());
    await form.locator('[name="category"]').selectOption(editObj.category);

    const submit = form.locator('[type="submit"]');
    expect(submit).toBeVisible();

    await submit.click();

    const response = await page.waitForResponse(/.*\/items\/.*/);
    expect(response.status()).toBe(200);

    obj = editObj;
});

test('delete', async ({ page }) => {
    const datatable = page.getByTestId('datatable');
    
    // filter datatable with object values
    await page.getByTestId('name-filter').locator('input').fill(obj.name);
    await page.getByTestId('cost-filter').locator('input').fill(obj.cost.toString());
    await page.getByTestId('weight-filter').locator('input').fill(obj.weight.toString());
    await page.getByTestId('category-filter').locator('input').fill(obj.category);
    await page.waitForTimeout(1000);

    // ensure one data row exists matching our added object
    const rows = datatable.locator('tbody > tr');
    expect((await rows.all()).length).toBe(1);
    expect(rows.first()).toContainText(obj.name);
    expect(rows.first()).toContainText(obj.cost.toString());
    expect(rows.first()).toContainText(obj.weight.toString());
    expect(rows.first()).toContainText(obj.category);

    const rowButton = datatable.locator('tbody > tr > td > button');
    expect(rowButton).toBeVisible();
    await rowButton.click();

    // click add button and ensure form is visible
    await page.getByTestId(/item-delete-.*/).click();
    await page.getByTestId('item-delete-submit').click();

    const response = await page.waitForResponse(/.*\/items\/.*/);
    expect(response.status()).toBe(204)

    // filter datatable with object values
    await page.getByTestId('name-filter').locator('input').fill(obj.name);
    await page.getByTestId('cost-filter').locator('input').fill(obj.cost.toString());
    await page.getByTestId('weight-filter').locator('input').fill(obj.weight.toString());
    await page.getByTestId('category-filter').locator('input').fill(obj.category);
    await page.waitForTimeout(1000);

    // ensure no data rows exist
    expect((await rows.all()).length).toBe(1);
    expect(rows.first().locator('td')).toHaveText('No available options');
});

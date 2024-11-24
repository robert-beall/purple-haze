import { expect, Page } from "@playwright/test";

interface CrudInput {
    page: Page,
    objGenerator: () => Record<string, any>,
    name: string,
    fields: string[],
    addUrl: string | RegExp,
    editUrl: string | RegExp,
    deleteUrl: string | RegExp,
};

const ensureNoRecord = async (page: Page) => {
    const datatable = page.getByTestId('datatable');
    const rows = datatable.locator('tbody > tr');
    expect((await rows.all()).length).toBe(1);
    expect(rows.first().locator('td')).toHaveText('No available options');
}

const ensureRecordExists = async (page: Page) => {
    const datatable = page.getByTestId('datatable');
    const rows = datatable.locator('tbody > tr');
    expect((await rows.all()).length).toBe(1);
    expect((await rows.first().locator('td').all()).length).toBeGreaterThan(1);
    expect(rows.first().locator('td').first()).not.toHaveText('No available options');
}

const addProcedure = async (name: string, obj: Record<string, any>, page: Page, addUrl: string | RegExp) => {
    await page.getByTestId(`${name}-add`).click();
    const form = page.getByTestId(`${name}-form`);
    expect(form).toBeVisible();

    const keys = Object.keys(obj);

    for (const element of keys) {
        const field = form.locator(`[name='${element}']`);
        expect(field).toBeVisible();
        const type = await field.getAttribute('type');
        type === null ? field.selectOption(obj[element]) : field.fill(obj[element].toString());
    }

    const submit = form.locator('[type="submit"]');
    expect(submit).toBeVisible();

    await submit.click();

    await page.waitForResponse(addUrl);
}

const filterRecordByIdField = async (name: string, obj: Record<string, any>, page: Page) => {
    const keys = Object.keys(obj);

    for (const element of keys) {
        const filterField = page.getByTestId(`${element}-filter`).locator('input');
        await filterField.fill(obj[element].toString());
        await page.waitForTimeout(1000);
    }
}

const editProcedure = async (name: string, obj: Record<string, any>, page: Page, editUrl: string | RegExp) => {
    const rowButton = page.getByTestId('datatable').locator('tbody > tr > td > button');
    expect(rowButton).toBeVisible();
    await rowButton.click();

    await page.getByTestId(/.*-edit-.*/).click();
    const form = page.getByTestId(`${name}-form`);
    expect(form).toBeVisible();

    const keys = Object.keys(obj);

    for (const element of keys) {
        const field = form.locator(`[name='${element}']`);
        expect(field).toBeVisible();
        const type = await field.getAttribute('type');
        type === null ? field.selectOption(obj[element]) : field.fill(obj[element].toString());
    }

    const submit = form.locator('[type="submit"]');
    expect(submit).toBeVisible();

    await submit.click();

    await page.waitForResponse(editUrl);
}

const deleteProcedure = async (name: string, page: Page, editUrl: string | RegExp) => {
    const rowButton = page.getByTestId('datatable').locator('tbody > tr > td > button');
    expect(rowButton).toBeVisible();
    await rowButton.click();

    await page.getByTestId(/.*-delete-.*/).click();

    await page.getByTestId(`${name}-delete-submit`).click();

    await page.waitForResponse(editUrl);
};

export const runCrud = async ({
    page,
    objGenerator, 
    name, 
    fields, 
    addUrl,
    editUrl,
    deleteUrl,
}: CrudInput) => {
    const addObject = objGenerator();
    await filterRecordByIdField(name, addObject, page);
    await ensureNoRecord(page);
    await addProcedure(name, addObject, page, addUrl);
    await filterRecordByIdField(name, addObject, page);
    await page.waitForTimeout(1000);
    await ensureRecordExists(page);
    const editObject = objGenerator();
    await editProcedure(name, editObject, page, editUrl);
    await filterRecordByIdField(name, editObject, page);
    await page.waitForTimeout(1000);
    await deleteProcedure(name, page, editUrl);
    await filterRecordByIdField(name, editObject, page);
    await page.waitForTimeout(1000);
}
import { expect, test } from '@playwright/test';
import 'dotenv/config';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
    await page.goto('/items');
});

test.describe('Page Information', () => {
    test('page heading', async ({ page }) => {
        const heading = page.getByTestId('page-heading');
        expect(await heading.textContent()).toBe('Items');
    });
});

test.describe('Datatable Header Structure', () => {
    /**
     * Test that the datatable features a top row with
     * one button titled 'Add Item'.
     */
    test('action section', async ({ page }) => {
        // Get the containing element of the datatable and the underlying table element
        const datatableContainer = page.getByTestId('datatable');

        // Get the datatable header and locate the add button inside it.
        const tableHeader = datatableContainer.locator('.p-datatable-header').first();
        const addButton = tableHeader.getByRole('button').first();

        // Expect add button to exist and contain text 'Add Item'
        expect(await addButton.allInnerTexts()).toContain('Add Item');
    });

    test('thead structure', async ({ page }) => {
        // Get the containing element of the datatable and the underlying table element
        const datatableContainer = page.getByTestId('datatable');
        const table = datatableContainer.getByRole('table');

        // Get the table header (<thead>) and its rows
        const thead = table.locator('thead');
        const rows = thead.getByRole('row');

        // Expect there to be two rows in the <thead> element
        expect(rows).toHaveCount(2);

        const columnHeaders = rows.first().getByRole('columnheader');
        expect(columnHeaders).toHaveCount(6);

        const columnFilters = rows.last().locator('th.p-filter-column');
        expect(columnFilters).toHaveCount(6);
    });

    test('table headers', async ({ page }) => {
        // Get the containing element of the datatable and the underlying table element
        const datatableContainer = page.getByTestId('datatable');
        const table = datatableContainer.getByRole('table');

        // Get the table header (<thead>) and its rows
        const thead = table.locator('thead');
        const rows = thead.getByRole('row');

        // Expect there to be two rows in the <thead> element
        expect(rows).toHaveCount(2);

        // Get the set of column headers
        const columnHeaders = rows.first().locator('th');

        // There should be 6 columns
        expect(columnHeaders).toHaveCount(6);

        // Get content sections of column headers
        const headerContentSections = await columnHeaders.locator('div.p-column-header-content');

        // Get the column headers titles
        const headerTitles = await headerContentSections.locator('span.p-column-title').allInnerTexts();

        // Establish expected column title names
        const expectedTitles = ['', 'ID', 'Name', 'Cost', 'Weight', 'Category'];

        // Confirm that actual header titles match expected values
        expect(headerTitles).toMatchObject(expectedTitles);

        const sortLocator = '[data-pc-section="sort"]';

        // The first column should not have a sort icon because it contains no data
        const columnHeader1Sort = headerContentSections.first().locator(sortLocator);
        expect(columnHeader1Sort).toHaveCount(0);

        // There should be 5 sort icons, one for each data column
        const columnSorts = headerContentSections.locator(sortLocator);
        expect(columnSorts).toHaveCount(5);
    });

    test('Datatable header sort sections', async () => {

    });

    test('datatable header structure', async ({ page }) => {
        // Get the containing element of the datatable and the underlying table element
        const datatableContainer = page.getByTestId('datatable');
        const table = datatableContainer.getByRole('table');
    
        // Get the datatable header and locate the add button inside it.
        const tableHeader = datatableContainer.locator('.p-datatable-header').first();
        const addButton = tableHeader.getByRole('button').first();
    
        // Expect add button to exist and contain text 'Add Item'
        expect(await addButton.allInnerTexts()).toContain('Add Item');
    
        // Get the table header (<thead>) and its rows
        const thead = table.locator('thead');
        const rows = thead.getByRole('row');
    
        // Expect there to be two rows in the table header
        expect(rows).toHaveCount(2);
    
        // Get the set of column headers
        const columnHeaders = rows.first().locator('th');
    
        // There should be 6 columns
        expect(columnHeaders).toHaveCount(6);
    
        // Get content sections of column headers
        const headerContentSections = await columnHeaders.locator('div.p-column-header-content');
    
        // Get the column headers titles
        const headerTitles = await headerContentSections.locator('span.p-column-title').allInnerTexts();
    
        // Establish expected column title names
        const expectedTitles = ['', 'ID', 'Name', 'Cost', 'Weight', 'Category'];
    
        // Confirm that actual header titles match expected values
        expect(headerTitles).toMatchObject(expectedTitles);
    
        const sortLocator = '[data-pc-section="sort"]';
    
        // The first column should not have a sort icon because it contains no data
        const columnHeader1Sort = headerContentSections.first().locator(sortLocator);
        expect(columnHeader1Sort).toHaveCount(0);
    
        // There should be 5 sort icons, one for each data column
        const columnSorts = headerContentSections.locator(sortLocator);
        expect(columnSorts).toHaveCount(5);
    });
});

test('datatable header structure', async ({ page }) => {
    // Get the containing element of the datatable and the underlying table element
    const datatableContainer = page.getByTestId('datatable');
    const table = datatableContainer.getByRole('table');

    // Get the datatable header and locate the add button inside it.
    const tableHeader = datatableContainer.locator('.p-datatable-header').first();
    const addButton = tableHeader.getByRole('button').first();

    // Expect add button to exist and contain text 'Add Item'
    expect(await addButton.allInnerTexts()).toContain('Add Item');

    // Get the table header (<thead>) and its rows
    const thead = table.locator('thead');
    const rows = thead.getByRole('row');

    // Expect there to be two rows in the table header
    expect(rows).toHaveCount(2);

    // Get the set of column headers
    const columnHeaders = rows.first().locator('th');

    // There should be 6 columns
    expect(columnHeaders).toHaveCount(6);

    // Get content sections of column headers
    const headerContentSections = await columnHeaders.locator('div.p-column-header-content');

    // Get the column headers titles
    const headerTitles = await headerContentSections.locator('span.p-column-title').allInnerTexts();

    // Establish expected column title names
    const expectedTitles = ['', 'ID', 'Name', 'Cost', 'Weight', 'Category'];

    // Confirm that actual header titles match expected values
    expect(headerTitles).toMatchObject(expectedTitles);

    const sortLocator = '[data-pc-section="sort"]';

    // The first column should not have a sort icon because it contains no data
    const columnHeader1Sort = headerContentSections.first().locator(sortLocator);
    expect(columnHeader1Sort).toHaveCount(0);

    // There should be 5 sort icons, one for each data column
    const columnSorts = headerContentSections.locator(sortLocator);
    expect(columnSorts).toHaveCount(5);
});
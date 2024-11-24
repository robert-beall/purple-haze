import { expect, test } from '@playwright/test';
import 'dotenv/config';
import { runCrud } from '../infrastructure/crud';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
    await page.goto('/items');
});

test('CRUD', async ({ page }) => {
    await runCrud({
        page,
        objGenerator: () => {
            return {
                name: faker.commerce.productName(),
                cost: faker.number.float({min: 0, max: 100, fractionDigits: 2 }),
                weight: faker.number.float({min: 0, max: 1000, fractionDigits: 3 }),
                category: faker.helpers.arrayElement(['FOOD', 'CLEANING', 'HARDWARE']),
            }
        },
        name: 'item',
        fields: [
            'id',
            'name',
            'cost',
            'weight',
            'category',
        ],
        addUrl: /.*\/items/,
        editUrl: /.*\/items\/.*/,
        deleteUrl: /\/items\/.*/,
    })
});
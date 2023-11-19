import { Then } from '@cucumber/cucumber';
import { ICustomWorld } from 'supports/world';
import { expect } from 'playwright/test';

Then('uživatel vidí název filmu {string}', async function (this: ICustomWorld, movieName: string) {
    await expect(this.page.locator('h1').filter({ hasText: movieName })).toBeVisible();
});

Then('uživatel vidí rok vydání {year}', async function (this: ICustomWorld, releaseYear: number) {
    await expect(
        this.page
            .locator('a')
            .filter({ hasText: `${releaseYear}` })
            .first()
    ).toBeVisible();
});

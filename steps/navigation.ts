import { When } from '@cucumber/cucumber';
import { ICustomWorld } from 'supports/world';
import { expect } from 'playwright/test';

When('uživatel vyhledá frázi {string}', async function (this: ICustomWorld, phrase: string) {
    await this.page.locator('input#suggestion-search').fill(phrase);
    await this.page.locator('button#suggestion-search-button').click();

    await expect(this.page.locator('h1').filter({ hasText: `Search "${phrase}"` })).toBeVisible();
});

When('uživatel otevře detail filmu {string}', async function (this: ICustomWorld, movieName: string) {
    await this.page.locator('a').filter({ hasText: movieName }).first().click();
});

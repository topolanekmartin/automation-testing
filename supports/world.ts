import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import { BrowserContext, Page, ChromiumBrowser } from '@playwright/test';
import { sanitizeFilename } from 'utils/sanitizeFilename';
import { chromium } from 'playwright';
import { ScenarioStorage } from 'types/ScenarioStorage';
import { PATHS } from 'constants/paths';

export interface ICustomWorld extends World {
    createPage: () => Promise<Page>;
    scenarioStorage: ScenarioStorage;
    page: Page;
    browser?: ChromiumBrowser;
    feature?: messages.Pickle;
    context?: BrowserContext;
    resolution?: { width: number; height: number };
}

export class CustomWorld extends World implements ICustomWorld {
    scenarioStorage = {};
    context?: BrowserContext;
    browser?: ChromiumBrowser;
    feature?: messages.Pickle;
    page: Page;
    resolution?: { width: number; height: number };

    constructor(options: IWorldOptions & ICustomWorld) {
        super(options);
        this.page = options.page;
        this.resolution = { width: 1600, height: 800 };
    }

    public async createPage() {
        const context = await this.createContext();
        const page = await context.newPage();

        await page.goto(this.getBaseUrl());

        return page;
    }

    private async getBrowser() {
        if (!this.browser) {
            this.browser = await chromium.launch();
        }

        return this.browser;
    }

    private async createContext() {
        const browser = await this.getBrowser();
        const context = await browser.newContext({
            acceptDownloads: true,
            recordVideo:
                process.env.RECORD_VIDEO === 'true' && this.feature
                    ? {
                          dir: `${PATHS.VIDEOS}/${sanitizeFilename(this.feature.name)}`,
                      }
                    : undefined,
            viewport: this.resolution,
        });

        await context.tracing.start({
            screenshots: true,
            snapshots: true,
        });

        return context;
    }

    private getBaseUrl() {
        return process.env.BASE_URL ?? '';
    }
}

setWorldConstructor(CustomWorld);

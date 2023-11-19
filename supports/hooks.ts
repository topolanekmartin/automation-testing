import { ICustomWorld } from 'supports/world';
import { After, Before, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import { handleResultStatus } from 'utils/handleResultStatus';
import { PATHS } from 'constants/paths';
import { prepareFolder } from 'utils/prepareFolder';

setDefaultTimeout(process.env.PWDEBUG === 'true' ? -1 : 60_000);

BeforeAll(async function () {
    for (const folder of Object.values(PATHS)) {
        await prepareFolder(folder);
    }
});

Before({ tags: '@ignore' }, async function () {
    return 'skipped';
});

Before({ tags: '@wip' }, async function () {
    return 'pending';
});

Before({ tags: '@mobile' }, async function (this: ICustomWorld) {
    this.resolution = { width: 375, height: 812 };
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
    this.feature = pickle;
    this.page = await this.createPage();
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
    await handleResultStatus(this, result);
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
});

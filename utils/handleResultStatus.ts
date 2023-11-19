import { Status } from '@cucumber/cucumber';
import { TestStepResult } from '@cucumber/messages';
import { sanitizeFilename } from 'utils/sanitizeFilename';
import { ICustomWorld } from 'supports/world';
import { PATHS } from 'constants/paths';

export async function handleResultStatus(wordInstance: ICustomWorld, result?: TestStepResult) {
    if (result) {
        wordInstance.attach(`Status: ${result.status}. Duration:${result.duration?.seconds}s`);

        if (result.status !== Status.PASSED) {
            const trace = wordInstance.context?.tracing;
            if (trace) {
                await trace.stop({
                    path: `${PATHS.TRACES}/${sanitizeFilename(wordInstance.feature?.name)}.zip`,
                });
            }

            const image = await wordInstance?.page?.screenshot();
            if (image) {
                wordInstance.attach(image, 'image/png');
            }
        }
    }
}

import * as p from '@clack/prompts';
export function checkCancel(value) {
    if (p.isCancel(value)) {
        p.cancel('Cancelled.');
        process.exit(0);
    }
    return value;
}

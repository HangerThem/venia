import * as p from '@clack/prompts';

export function checkCancel<T>(value: T | symbol): T {
	if (p.isCancel(value)) {
		p.cancel('Cancelled.');
		process.exit(0);
	}
	return value as T;
}
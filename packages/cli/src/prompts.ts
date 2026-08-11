import * as p from '@clack/prompts';
import { checkCancel } from './lib/cancel.js';
import type { ConsentCategory } from '@venia-consent/core';

export async function promptCategories(): Promise<ConsentCategory[]> {
	const result = await p.multiselect({
		message: 'Which consent categories do you need?',
		options: [
			{ value: 'necessary', label: 'Necessary', hint: 'always required, cannot be disabled' },
			{ value: 'functional', label: 'Functional' },
			{ value: 'analytics', label: 'Analytics' },
			{ value: 'marketing', label: 'Marketing' },
		],
		initialValues: ['necessary', 'functional', 'analytics', 'marketing'],
		required: true,
	});

	return checkCancel(result) as ConsentCategory[];
}

export async function promptTheme(): Promise<string> {
	const result = await p.select({
		message: 'Pick a theme',
		options: [
			{ value: 'default', label: 'Default' },
			{ value: 'forest', label: 'Forest' },
			{ value: 'nord', label: 'Nord' },
			{ value: 'solarized', label: 'Solarized' },
			{ value: 'sunset', label: 'Sunset' },
			{ value: 'high-contrast', label: 'High contrast', hint: 'accessibility-focused' },
		],
	});

	return checkCancel(result) as string;
}

export async function promptMode(): Promise<'banner' | 'card' | 'modal'> {
	const result = await p.select({
		message: 'Display mode',
		options: [
			{ value: 'banner', label: 'Banner', hint: 'fixed bar, bottom of viewport' },
			{ value: 'card', label: 'Card', hint: 'standalone, non-fixed' },
			{ value: 'modal', label: 'Modal', hint: 'blocks interaction until decided' },
		],
	});

	return checkCancel(result) as 'banner' | 'card' | 'modal';
}

export async function confirmOverwrite(path: string): Promise<boolean> {
	const result = await p.confirm({
		message: `${path} already exists. Overwrite it?`,
		initialValue: false,
	});

	return checkCancel(result) as boolean;
}
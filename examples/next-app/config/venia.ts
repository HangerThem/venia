import type { VeniaConfig } from '@venia/core';

export const veniaConfig: VeniaConfig = {
	categories: ['necessary', 'functional', 'analytics', 'marketing'],
	categoryLabels: {
		necessary: {
			label: 'Necessary',
			description: 'These cookies are essential for the website to function properly.',
		},
		functional: {
			label: 'Functional',
			description: 'These cookies allow the website to remember your preferences and provide enhanced functionality.',
		},
		analytics: {
			label: 'Analytics',
			description: 'These cookies help us understand how visitors interact with our website, allowing us to improve user experience.',
		},
	},
	cookieName: 'venia-consent',
	version: 1,
};
import type { ConsentStore } from './consent-store';
import type { ConsentCategory } from './types';

export function initScriptGate(store: ConsentStore) {
	const activate = () => {
		const state = store.getConsent();
		if (!state) return;

		document
			.querySelectorAll<HTMLScriptElement>('script[type="text/plain"][data-venia-category]')
			.forEach((el) => {
				const category = el.dataset.veniaCategory as ConsentCategory;
				if (!state.categories[category] || el.dataset.veniaLoaded) return;

				const script = document.createElement('script');
				[...el.attributes].forEach((attr) => {
					if (attr.name !== 'type') script.setAttribute(attr.name, attr.value);
				});
				script.text = el.text;
				el.dataset.veniaLoaded = 'true';
				el.replaceWith(script);
			});
	};

	store.onChange(activate);
	activate();
}
// src/commands/init.ts
import * as p from '@clack/prompts';
import { detectFramework } from '../detectors/framework.js';
import { detectPackageManager } from '../detectors/package-manager.js';
import { writeConfig } from '../generators/config.js';
import { injectProvider } from '../generators/provider.js';
import { installPackages } from '../lib/install.js';
import { manualSnippet } from '../generators/provider.js';
import { promptCategories, promptMode, promptTheme } from '../prompts.js';

export async function init() {
	p.intro('venia init');

	const framework = detectFramework(); // 'next-app-router' | 'next-pages' | 'vite-react' | 'unknown'
	const pm = detectPackageManager();   // 'bun' | 'npm' | 'pnpm' | 'yarn'

	if (framework === 'unknown') {
		p.log.warn("Couldn't detect your framework automatically — you'll need to wire up the provider manually. See the docs.");
	} else {
		p.log.info(`Detected: ${framework} (${pm})`);
	}

	const categories = await promptCategories();
	const theme = await promptTheme();
	const mode = await promptMode();

	const spin = p.spinner();
	spin.start('Installing packages');
	await installPackages(pm, ['@venia-consent/react', '@venia-consent/theme']);
	spin.stop('Packages installed');

	writeConfig({ categories, theme, mode });

	if (framework !== 'unknown') {
		const injected = injectProvider(framework, { theme, mode });
		if (injected) {
			p.log.success(`Added VeniaProvider to your ${framework === 'next-app-router' ? 'layout.tsx' : 'App entry'}`);
		} else {
			p.log.warn("Couldn't auto-inject the provider — see the snippet below to add it manually.");
			p.note(manualSnippet({ theme, mode }), 'Add this to your root layout');
		}
	}

	p.outro('Done. Run your dev server to see the banner.');
}
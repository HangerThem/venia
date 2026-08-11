// import * as p from '@clack/prompts';

type Framework = 'next-app-router' | 'next-pages' | 'vite-react' | 'unknown';

interface InjectOptions {
  theme: string;
  mode: string;
}

/**
 * v0.1: does not modify user files. Prints the exact snippet to paste,
 * tailored to the detected framework. Returns false always for now —
 * "injected" is reserved for a future AST-based version (see roadmap).
 */
export function injectProvider(framework: Framework, options: InjectOptions): boolean {
  return false;
}

export function manualSnippet(options: InjectOptions): string {
  return `import { VeniaProvider } from '@venia-consent/react';
import '@venia-consent/theme/${options.theme}.css';
import { veniaConfig } from '@/venia.config';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <VeniaProvider config={veniaConfig} mode="${options.mode}">
          {children}
        </VeniaProvider>
      </body>
    </html>
  );
}`;
}
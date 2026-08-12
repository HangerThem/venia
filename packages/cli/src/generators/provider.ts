// import * as p from '@clack/prompts';

type Framework = 'next-app-router' | 'next-pages' | 'vite-react' | 'vue' | 'unknown'

interface InjectOptions {
  theme: string
  mode: string
}

/**
 * v0.1: does not modify user files. Prints the exact snippet to paste,
 * tailored to the detected framework. Returns false always for now —
 * "injected" is reserved for a future AST-based version (see roadmap).
 */
export function injectProvider(framework: Framework, options: InjectOptions): boolean {
  return false
}

export function manualSnippet(framework: Framework, options: InjectOptions): string {
  if (framework === 'next-app-router') {
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
}`
  } else if (framework === 'next-pages') {
    return `import { VeniaProvider } from '@venia-consent/react';
import '@venia-consent/theme/${options.theme}.css';
import { veniaConfig } from '@/venia.config';

function MyApp({ Component, pageProps }) {
  return (
    <VeniaProvider config={veniaConfig} mode="${options.mode}">
      <Component {...pageProps} />
    </VeniaProvider>
  );
}`
  } else if (framework === 'vite-react') {
    return `import { VeniaProvider } from '@venia-consent/react';
import '@venia-consent/theme/${options.theme}.css';
import { veniaConfig } from '@/venia.config';

export function App() {
  return (
    <VeniaProvider config={veniaConfig} mode="${options.mode}">
      {/* your app */}
    </VeniaProvider>
  );
}`
  } else if (framework === 'vue') {
    return `<script setup lang="ts">
import { VeniaProvider } from '@venia-consent/vue'
import '@venia-consent/theme/${options.theme}.css'
import { veniaConfig } from './venia.config'
</script>

<template>
  <VeniaProvider :config="veniaConfig" mode="${options.mode}">
    {/* your app */}
  </VeniaProvider>
</template>`
  }
  return ''
}

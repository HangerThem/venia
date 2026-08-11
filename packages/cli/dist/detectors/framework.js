import { existsSync } from 'node:fs';
export function detectFramework() {
    if (existsSync('app/layout.tsx') || existsSync('src/app/layout.tsx'))
        return 'next-app-router';
    if (existsSync('pages/_app.tsx'))
        return 'next-pages';
    if (existsSync('vite.config.ts') && existsSync('src/main.tsx'))
        return 'vite-react';
    return 'unknown';
}

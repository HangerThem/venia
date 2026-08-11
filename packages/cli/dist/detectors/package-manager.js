import { existsSync } from 'node:fs';
export function detectPackageManager() {
    if (existsSync('bun.lock') || existsSync('bun.lockb'))
        return 'bun';
    if (existsSync('pnpm-lock.yaml'))
        return 'pnpm';
    if (existsSync('yarn.lock'))
        return 'yarn';
    return 'npm';
}
export function installCommand(pm, packages) {
    const pkgArgs = packages;
    switch (pm) {
        case 'bun':
            return ['bun', ['add', ...pkgArgs]];
        case 'pnpm':
            return ['pnpm', ['add', ...pkgArgs]];
        case 'yarn':
            return ['yarn', ['add', ...pkgArgs]];
        case 'npm':
            return ['npm', ['install', ...pkgArgs]];
    }
}

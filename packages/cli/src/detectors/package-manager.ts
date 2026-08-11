import { existsSync } from 'node:fs';

export type PackageManager = 'bun' | 'pnpm' | 'yarn' | 'npm';

export function detectPackageManager(): PackageManager {
  if (existsSync('bun.lock') || existsSync('bun.lockb')) return 'bun';
  if (existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (existsSync('yarn.lock')) return 'yarn';
  return 'npm';
}

export function installCommand(pm: PackageManager, packages: string[]): [string, string[]] {
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
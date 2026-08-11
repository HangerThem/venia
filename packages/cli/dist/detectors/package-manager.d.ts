export type PackageManager = 'bun' | 'pnpm' | 'yarn' | 'npm';
export declare function detectPackageManager(): PackageManager;
export declare function installCommand(pm: PackageManager, packages: string[]): [string, string[]];

import type { ConsentCategory } from '@venia-consent/core';
export declare function promptCategories(): Promise<ConsentCategory[]>;
export declare function promptTheme(): Promise<string>;
export declare function promptMode(): Promise<'banner' | 'card' | 'modal'>;
export declare function confirmOverwrite(path: string): Promise<boolean>;

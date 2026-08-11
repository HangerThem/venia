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
export declare function injectProvider(framework: Framework, options: InjectOptions): boolean;
export declare function manualSnippet(options: InjectOptions): string;
export {};

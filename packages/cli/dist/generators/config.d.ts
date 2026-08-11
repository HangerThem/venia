interface InitAnswers {
    categories: string[];
    theme: string;
    mode: 'banner' | 'card' | 'modal';
}
export declare function writeConfig({ categories, theme, mode }: InitAnswers): void;
export declare function configMeta(theme: string, mode: string): {
    theme: string;
    mode: string;
};
export {};

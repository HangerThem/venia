export type ConsentCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

export interface CategoryMeta {
	label: string;
	description: string;
}

export interface ConsentState {
	version: number;
	categories: Record<ConsentCategory, boolean>;
	timestamp: number;
}

export interface VeniaConfig {
	categories?: ConsentCategory[];
	categoryLabels?: Partial<Record<ConsentCategory, CategoryMeta>>;
	cookieName?: string;
	version?: number;
	onChange?: (state: ConsentState) => void;
}
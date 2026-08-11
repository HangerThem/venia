
export interface CategoryMeta {
  label: string
  description: string
}

interface KnownConsentCategories {
  necessary: boolean;
  functional?: boolean;
  analytics?: boolean;
  marketing?: boolean;
}

export interface ConsentCategories extends KnownConsentCategories {
  [key: string]: boolean | undefined;
}

export type ConsentCategory = keyof KnownConsentCategories | (string & {});

export interface ConsentState {
  version: number
  categories: ConsentCategories
  timestamp: number
}

export interface ScriptDefinition {
  src: string
  category: ConsentCategory
}

export interface VeniaConfigObject {
  bannerHeading?: string
  bannerText?: string
  description?: string
  categories?: ConsentCategory[]
  categoryLabels?: Partial<Record<ConsentCategory, CategoryMeta>>
  scripts?: Record<string, ScriptDefinition>
  cookieName?: string
  version?: number
  onChange?: (state: ConsentState) => void
}

export type VeniaConfig = VeniaConfigObject | string
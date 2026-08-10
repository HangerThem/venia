export type ConsentCategory = 'necessary' | 'functional' | 'analytics' | 'marketing'

export interface CategoryMeta {
  label: string
  description: string
}

export interface ConsentState {
  version: number
  categories: Record<ConsentCategory, boolean>
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
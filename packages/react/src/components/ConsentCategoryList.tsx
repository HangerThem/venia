'use client'

import type { ConsentCategory } from '@venia-consent/core'

import type { ConsentCategoryItem } from '../useConsentCategories'

interface ConsentCategoryListProps {
  categories: ConsentCategoryItem[]
  selected: Record<ConsentCategory, boolean>
  onToggle: (categoryId: ConsentCategory, isChecked: boolean) => void
  /** Compact rows for the card surface: label only, no description. */
  compact?: boolean
}

export function ConsentCategoryList({
  categories,
  selected,
  onToggle,
  compact = false,
}: ConsentCategoryListProps) {
  return (
    <ul
      className={
        compact ? 'venia-category-list venia-category-list--compact' : 'venia-category-list'
      }
    >
      {categories.map((category) => (
        <li key={category.id} className="venia-category-row">
          <div className="venia-category-text">
            <p className="venia-category-label">{category.label}</p>
            {!compact && category.description && (
              <p className="venia-category-desc">{category.description}</p>
            )}
          </div>
          <button
            className="venia-toggle"
            role="switch"
            onClick={(e) => {
              e.preventDefault()
              onToggle(category.id, !selected[category.id])
            }}
            aria-checked={selected[category.id]}
            aria-label={`Toggle ${category.label} cookies`}
            data-checked={selected[category.id] ? 'true' : 'false'}
            data-locked={category.id === 'necessary' ? 'true' : 'false'}
            disabled={category.id === 'necessary'}
          >
            <span className="venia-toggle-thumb" />
          </button>
        </li>
      ))}
    </ul>
  )
}

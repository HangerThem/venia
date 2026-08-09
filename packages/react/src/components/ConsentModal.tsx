'use client'

import type { ConsentStore } from '@venia/core'

import { ConsentCategoryList } from './ConsentCategoryList'
import { useConsentCategories } from '../useConsentCategories'

export function ConsentModal({ store }: { store: ConsentStore }) {
  const { categories, selected, toggle, save } = useConsentCategories(store)

  return (
    <div className="venia-modal-backdrop" role="presentation">
      <div className="venia-modal" role="dialog" aria-modal="true" aria-label="Cookie consent">
        <h2 className="venia-heading">
          {store.getConfig().bannerHeading ?? 'This site uses cookies'}
        </h2>
        <p className="venia-content">
          {store.getConfig().bannerText ??
            'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.'}
        </p>

        <div className="venia-customize">
          <ConsentCategoryList categories={categories} selected={selected} onToggle={toggle} />
        </div>

        <div className="venia-actions">
          <button className="venia-btn" onClick={() => store.rejectAll()}>
            Reject all
          </button>
          <button className="venia-btn" onClick={() => store.acceptAll()}>
            Accept all
          </button>
          <button className="venia-btn venia-btn--ghost venia-btn--save" onClick={save}>
            Save preferences
          </button>
        </div>
      </div>
    </div>
  )
}

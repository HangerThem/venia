'use client'

import { useMemo, useState } from 'react'
import { Cookie } from 'lucide-react'

import { ConsentCategory, type ConsentStore } from '@venia/core'

export function ConsentBanner({ store }: { store: ConsentStore }) {
  const categories = useMemo(
    () =>
      store.getConfig().categories?.map((category) => ({
        id: category,
        label: store.getConfig().categoryLabels?.[category]?.label ?? category,
        description: store.getConfig().categoryLabels?.[category]?.description ?? '',
      })) ?? [],
    [store],
  )

  const [customizeVisible, setCustomizeVisible] = useState(false)
  const [selected, setSelected] = useState<Record<ConsentCategory, boolean>>(
    () =>
      categories.reduce(
        (acc, category) => {
          acc[category.id] =
            category.id === 'necessary'
              ? true
              : (store.getConsent()?.categories?.[category.id] ?? false)
          return acc
        },
        {} as Record<ConsentCategory, boolean>,
      ) ?? {},
  )

  const toggle = (categoryId: string, isChecked: boolean) => {
    setSelected((prev) => ({
      ...prev,
      [categoryId]: isChecked,
    }))
  }

  return (
    <div className="venia-banner" role="dialog" aria-label="Cookie consent">
      <p className="venia-text">
        <Cookie />
        {store.getConfig().bannerText ??
          'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.'}
      </p>
      {customizeVisible && (
        <div className="venia-customize">
          <p className="venia-text">Customize your cookie preferences below.</p>
          <div className="venia-actions">
            {categories.map((category) => (
              <label key={category.id} className="venia-category">
                <button
                  className="venia-toggle"
                  role="switch"
                  onClick={(e) => {
                    e.preventDefault()
                    toggle(category.id, !selected[category.id])
                  }}
                  aria-checked={selected[category.id]}
                  aria-label={`Toggle ${category.label} cookies`}
                  data-checked={selected[category.id] ? 'true' : 'false'}
                  data-locked={category.id === 'necessary' ? 'true' : 'false'}
                  disabled={category.id === 'necessary'}
                >
                  <span className="venia-toggle-thumb" />
                </button>
                <p className="venia-category-label">
                  {store.getConfig().categoryLabels?.[category.id]?.label ?? category.id}
                </p>
                <p className="venia-category-description">
                  {store.getConfig().categoryLabels?.[category.id]?.description ?? ''}
                </p>
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="venia-actions">
        <button className="venia-btn" onClick={() => store.rejectAll()}>
          Reject all
        </button>
        <button className="venia-btn" onClick={() => store.acceptAll()}>
          Accept all
        </button>
        <button
          className="venia-btn venia-btn--ghost"
          onClick={() => setCustomizeVisible(!customizeVisible)}
        >
          Customize
        </button>
      </div>
    </div>
  )
}

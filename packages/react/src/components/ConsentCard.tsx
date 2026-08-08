'use client'

import { Cookie } from 'lucide-react'

import type { ConsentStore } from '@venia/core'

export function ConsentCard({ store }: { store: ConsentStore }) {
  return (
    <div className="venia-banner" role="dialog" aria-label="Cookie consent">
      <p className="venia-text">
        <Cookie />
        {store.getConfig().bannerText ??
          'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.'}
      </p>
      <div className="venia-actions">
        <button className="venia-btn" onClick={() => store.rejectAll()}>
          Reject all
        </button>
        <button className="venia-btn" onClick={() => store.acceptAll()}>
          Accept all
        </button>
        <button className="venia-btn venia-btn--ghost" onClick={() => {}}>
          Customize
        </button>
      </div>
    </div>
  )
}

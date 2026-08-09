'use client'

import { Cookie } from 'lucide-react'

import type { ConsentStore } from '@venia-consent/core'

import { ConsentBanner } from './ConsentBanner'
import { ConsentCard } from './ConsentCard'
import { ConsentModal } from './ConsentModal'

export function ConsentComponent({
  store,
  mode = 'banner',
}: {
  store: ConsentStore
  mode: 'banner' | 'card' | 'modal'
}) {
  if (store.hasDecided()) {
    return (
      <button className="venia-reset" onClick={() => store.resetConsent()}>
        <Cookie />
      </button>
    )
  }

  switch (mode) {
    case 'banner':
      return <ConsentBanner store={store} />
    case 'card':
      return <ConsentCard store={store} />
    case 'modal':
      return <ConsentModal store={store} />
    default:
      return null
  }
}

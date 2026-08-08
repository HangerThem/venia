'use client'

import { createContext, useEffect, useState, useMemo } from 'react'

import { ConsentStore, initScriptGate } from '@venia/core'
import type { VeniaConfig, ConsentState } from '@venia/core'

import { ConsentComponent } from './components/ConsentComponent'

export const VeniaContext = createContext<{
  store: ConsentStore
  consent: ConsentState | null
} | null>(null)

export function VeniaProvider({
  config,
  children,
  mode = 'banner',
}: {
  config?: VeniaConfig
  children: React.ReactNode
  mode?: 'banner' | 'card' | 'modal'
}) {
  const store = useMemo(() => new ConsentStore(config), [config])
  const [consent, setConsent] = useState(store.getConsent())

  useEffect(() => {
    initScriptGate(store)
    const unsubscribe = store.onChange(setConsent)
    return () => {
      unsubscribe()
    }
  }, [store])

  const value = useMemo(() => ({ store, consent }), [store, consent])

  return (
    <VeniaContext.Provider value={value}>
      {children}
      <ConsentComponent store={store} mode={mode} />
    </VeniaContext.Provider>
  )
}

'use client'

import { createContext, useEffect, useState, useMemo } from 'react'

import { ConsentStore, initScriptGate } from '@venia-consent/core'
import type { VeniaConfig, ConsentState } from '@venia-consent/core'

import { ConsentComponent } from './components/ConsentComponent'

type VeniaContextType = {
  store: ConsentStore
  consent: ConsentState | null
}

export const VeniaContext = createContext<VeniaContextType | null>(null)

type VeniaProviderProps = {
  config?: VeniaConfig
  children: React.ReactNode
  mode?: 'banner' | 'card' | 'modal'
}

export function VeniaProvider({ config, children, mode = 'banner' }: VeniaProviderProps) {
  const store = useMemo(() => new ConsentStore(config), [config])
  const [consent, setConsent] = useState(store.getConsent())

  useEffect(() => {
    initScriptGate(store)
    const unsubscribe = store.onChange(setConsent)
    return () => {
      unsubscribe()
    }
  }, [store])

  const value = useMemo<VeniaContextType>(() => ({ store, consent }), [store, consent])

  return (
    <VeniaContext.Provider value={value}>
      {children}
      <ConsentComponent store={store} mode={mode} />
    </VeniaContext.Provider>
  )
}

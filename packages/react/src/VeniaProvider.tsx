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
  config: VeniaConfig
  children: React.ReactNode
  mode?: 'banner' | 'card' | 'modal'
}

export function VeniaProvider({ config, children, mode = 'banner' }: VeniaProviderProps) {
  const [store, setStore] = useState<ConsentStore | null>(null)
  const [consent, setConsent] = useState<ConsentState | null>(null)

  useEffect(() => {
    let cancelled = false
    ConsentStore.create(config).then((newStore) => {
      if (cancelled) return
      setStore(newStore)
      setConsent(newStore.getConsent())
    })
    return () => {
      cancelled = true
    }
  }, [config])

  useEffect(() => {
    if (!store) return
    initScriptGate(store)
    const unsubscribe = store.onChange(setConsent)
    return () => {
      unsubscribe()
    }
  }, [store])

  const value = useMemo<VeniaContextType | null>(
    () => (store ? { store, consent } : null),
    [store, consent],
  )

  if (!store || !value) {
    return <>{children}</>
  }

  return (
    <VeniaContext.Provider value={value}>
      {children}
      <ConsentComponent store={store} mode={mode} />
    </VeniaContext.Provider>
  )
}

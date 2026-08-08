'use client';

import { createContext, useEffect, useState, useMemo } from 'react';
import { ConsentStore, initScriptGate } from '@venia/core';
import type { VeniaConfig, ConsentState } from '@venia/core';
import { ConsentBanner } from './components/ConsentBanner';

export const VeniaContext = createContext<{
  store: ConsentStore;
  consent: ConsentState | null;
} | null>(null);

export function VeniaProvider({ config, children, mode = 'banner' }: { config?: VeniaConfig; children: React.ReactNode; mode?: 'banner' | 'card' | 'modal' }) {
  const store = useMemo(() => new ConsentStore(config), []);
  const [consent, setConsent] = useState(store.getConsent());

  useEffect(() => {
    initScriptGate(store);
    const unsubscribe = store.onChange(setConsent);
    return () => {
      unsubscribe();
    };
  }, [store]);

  return (
    <VeniaContext.Provider value={{ store, consent }}>
      {children}
      <ConsentBanner store={store} mode={mode} />
    </VeniaContext.Provider>
  );
}
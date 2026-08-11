import { inject, type InjectionKey, type Ref } from 'vue';
import type { ConsentStore, ConsentState } from '@venia-consent/core';

export interface VeniaContextValue {
  store: ConsentStore;
  consent: Readonly<Ref<ConsentState | null>>;
}

export const VeniaKey: InjectionKey<VeniaContextValue> = Symbol('venia');

export function useConsent(): VeniaContextValue {
  const ctx = inject(VeniaKey);
  if (!ctx) throw new Error('useConsent must be used within <VeniaProvider>');
  return ctx;
}
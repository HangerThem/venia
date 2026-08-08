import { useContext } from 'react'
import { VeniaContext } from './VeniaProvider'

export function useConsent() {
  const ctx = useContext(VeniaContext)
  if (!ctx) throw new Error('useConsent must be used within VeniaProvider')
  return ctx
}

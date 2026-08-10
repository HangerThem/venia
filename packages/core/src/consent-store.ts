import type { ConsentState, ConsentCategory, VeniaConfig, VeniaConfigObject } from './types'

const DEFAULT_CATEGORIES: ConsentCategory[] = ['necessary', 'functional', 'analytics', 'marketing']

export class ConsentStore {
  private state: ConsentState | null = null
  private listeners = new Set<(state: ConsentState) => void>()

  private constructor(
    private _config: VeniaConfigObject,
    private cookieName: string,
    private version: number,
  ) {
    this.state = this.load();
  }

  static async create(config: VeniaConfig): Promise<ConsentStore> {
    if (typeof config === 'string') {
      const resolved: VeniaConfigObject = await fetch(config)
        .then((res) => res.json())
        .catch(() => ({}));
      return new ConsentStore(resolved, resolved.cookieName ?? 'venia-consent', resolved.version ?? 1);
    }
    return new ConsentStore(config, config.cookieName ?? 'venia-consent', config.version ?? 1);
  }

  private getStorage(): Storage | null {
    if (typeof window === 'undefined') return null

    try {
      return window.localStorage
    } catch {
      return null
    }
  }

  private load(): ConsentState | null {
    const storage = this.getStorage()
    if (!storage) return null

    const raw = storage.getItem(this.cookieName)
    if (!raw) return null

    try {
      const parsed: ConsentState = JSON.parse(raw)
      return parsed.version === this.version ? parsed : null
    } catch {
      return null
    }
  }

  getConfig(): VeniaConfigObject {
    return this._config
  }

  getConsent(): ConsentState | null {
    return this.state
  }

  hasDecided(): boolean {
    return this.state !== null
  }

  updateConsent(categories: Record<ConsentCategory, boolean>) {
    this.state = {
      version: this.version,
      categories: { ...categories, necessary: true },
      timestamp: Date.now(),
    }

    const storage = this.getStorage()
    if (storage) {
      storage.setItem(this.cookieName, JSON.stringify(this.state))
    }

    this.listeners.forEach((fn) => fn(this.state!))
    this._config.onChange?.(this.state)
  }

  acceptAll() {
    const cats = (this._config.categories ?? DEFAULT_CATEGORIES).reduce(
      (acc, c) => {
        acc[c] = true
        return acc
      },
      {} as Record<ConsentCategory, boolean>,
    )
    this.updateConsent(cats)
  }

  rejectAll() {
    const cats = (this._config.categories ?? DEFAULT_CATEGORIES).reduce(
      (acc, c) => {
        acc[c] = c === 'necessary'
        return acc
      },
      {} as Record<ConsentCategory, boolean>,
    )
    this.updateConsent(cats)
  }

  resetConsent() {
    this.state = null
    const storage = this.getStorage()
    if (storage) {
      storage.removeItem(this.cookieName)
    }
    this.listeners.forEach((fn) => fn(this.state!))
    this._config.onChange?.(this.state!)
  }

  onChange(fn: (state: ConsentState) => void) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }
}

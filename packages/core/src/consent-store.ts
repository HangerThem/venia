import { getStorageAdapter } from './storage-adapter';
import type { ConsentState, ConsentCategory, VeniaConfig, VeniaConfigObject, ConsentCategories } from './types'

const DEFAULT_CATEGORIES: ConsentCategory[] = ['necessary', 'functional', 'analytics', 'marketing']

export class ConsentStore {
  private state: ConsentState | null = null
  private listeners = new Set<(state: ConsentState) => void>()

  private constructor(
    private _config: VeniaConfigObject,
    private cookieName: string,
    private version: number,
    initialState: ConsentState | null,
  ) {
    this.state = initialState;
  }

  static async create(config: VeniaConfig): Promise<ConsentStore> {
    const resolved: VeniaConfigObject =
      typeof config === 'string'
        ? await fetch(config).then((res) => res.json()).catch(() => ({}))
        : config;

    const cookieName = resolved.cookieName ?? 'venia-consent';
    const version = resolved.version ?? 1;
    const state = await ConsentStore.loadState(cookieName, version);

    return new ConsentStore(resolved, cookieName, version, state);
  }

  private static async loadState(cookieName: string, version: number): Promise<ConsentState | null> {
    const storage = getStorageAdapter();
    const raw = await storage?.get(cookieName);
    if (!raw) return null;
    try {
      const parsed: ConsentState = JSON.parse(raw);
      return parsed.version === version ? parsed : null;
    } catch {
      return null;
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

  updateConsent(categories: ConsentCategories) {
    this.state = { version: this.version, categories: { ...categories, necessary: true }, timestamp: Date.now() };
    getStorageAdapter()?.set(this.cookieName, JSON.stringify(this.state));
    this.listeners.forEach((fn) => fn(this.state!));
    this._config.onChange?.(this.state);
  }

  resetConsent() {
    this.state = null
    getStorageAdapter()?.delete(this.cookieName)   // cookie removal — fires immediately
    this.listeners.forEach((fn) => fn(this.state as any))   // ← notifies subscribers
    this._config.onChange?.(this.state as any)
  }

  acceptAll() {
    const cats = (this._config.categories ?? DEFAULT_CATEGORIES).reduce(
      (acc, c) => {
        acc[c] = true
        return acc
      },
      {} as ConsentCategories,
    )
    this.updateConsent(cats)
  }

  rejectAll() {
    const cats = (this._config.categories ?? DEFAULT_CATEGORIES).reduce(
      (acc, c) => {
        acc[c] = c === 'necessary'
        return acc
      },
      {} as ConsentCategories,
    )
    this.updateConsent(cats)
  }


  onChange(fn: (state: ConsentState) => void) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }
}

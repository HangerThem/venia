# @venia-consent/core

Framework-agnostic consent state, persistence, and script-gating. No UI — pairs with [`@venia-consent/react`](../react) or a custom integration for other frameworks.

## Install

```bash
bun add @venia-consent/core
```

## Usage

```ts
import { ConsentStore, initScriptGate } from '@venia-consent/core';

const store = new ConsentStore({
  categories: ['necessary', 'functional', 'analytics', 'marketing'],
  version: 1,
  onChange: (state) => console.log('consent updated', state),
});

// Read current consent
store.getConsent(); // ConsentState | null
store.hasDecided();  // boolean

// Update consent
store.acceptAll();
store.rejectAll();
store.updateConsent({ necessary: true, functional: true, analytics: false, marketing: false });

// Gate scripts marked with data-venia-category
initScriptGate(store);
```

```html
<script type="text/plain" data-venia-category="analytics" src="..."></script>
```

Scripts tagged this way are swapped to real, executing `<script>` tags automatically once their category is granted — nothing else needs to call into `script-gate` manually per script.

## API

### `new ConsentStore(config?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `categories` | `ConsentCategory[]` | all four built-ins | Categories this store manages |
| `cookieName` | `string` | `'venia-consent'` | Storage key |
| `version` | `number` | `1` | Bump to invalidate previously stored consent |
| `onChange` | `(state: ConsentState) => void` | — | Called on every consent update |

### Methods

- `getConsent(): ConsentState \| null`
- `hasDecided(): boolean`
- `updateConsent(categories: Record<ConsentCategory, boolean>)`
- `acceptAll()`
- `rejectAll()`
- `resetConsent()` — clears stored consent and re-triggers the undecided UI state, without changing `version`
- `onChange(fn): () => void` — subscribe, returns unsubscribe

`necessary` is always forced to `true` regardless of what's passed to `updateConsent`.

## Versioning consent

If you change what a category means, or add/remove categories, bump `version`. Stored consent recorded under an older version is treated as absent, and the user is re-prompted. This exists specifically to avoid silently relying on stale consent after your categorization changes.

## License

MIT
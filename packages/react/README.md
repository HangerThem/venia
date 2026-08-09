# @venia-consent/react

React bindings for [`@venia-consent/core`](../core) — a provider, hooks, and the default banner/customize UI.

## Install

```bash
bun add @venia-consent/react
```

`@venia-consent/core` is a dependency, not a peer — you don't need to install it separately, but the default theme is a separate package so you can swap or omit it.

## Usage

```tsx
'use client';
import { VeniaProvider } from '@venia-consent/react';
import '@venia-consent/theme/sunset.css';

export default function RootLayout({ children }) {
  return (
    <VeniaProvider
      config={{ categories: ['necessary', 'functional', 'analytics', 'marketing'] }}
      mode="modal"
    >
      {children}
    </VeniaProvider>
  );
}
```

## Display modes

`VeniaProvider` accepts a `mode` prop controlling which UI renders once consent is undecided:

| Mode | Description |
|---|---|
| `banner` (default) | Fixed bar, bottom of viewport |
| `card` | Standalone card, non-fixed positioning |
| `modal` | Centered overlay, blocks interaction until decided |

Once consent has been decided, `VeniaProvider` swaps to a small persistent icon button (cookie icon) that reopens preferences via `store.resetConsent()` — regardless of which `mode` was used initially.

## API

### `<VeniaProvider config={VeniaConfig} mode?={'banner' | 'card' | 'modal'}>`

### `useConsent()`

Returns `{ store, consent }`.

### `<ConsentComponent store={ConsentStore} mode={'banner' | 'card' | 'modal'}>`

Internally used by `VeniaProvider` — exported for advanced cases where you want to render the consent UI somewhere other than the provider's default mount point.

## Peer dependencies

- `react`, `react-dom` (existing)
- `lucide-react` — used for the persistent settings icon after consent is decided

## Styling

Ships unstyled by default (semantic class names only: `.venia-banner`, `.venia-btn`, etc.) — pair with `@venia-consent/theme`, or write your own CSS against the same class names.

## License

MIT
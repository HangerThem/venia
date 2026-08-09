# Venia

A cookie consent library built around one rule: **reject should never be harder than accept.**

Most consent banners visually nudge users toward "Accept All" — bigger button, brighter color, pre-checked boxes, a "Reject" link buried in gray text. Venia's default theme gives accept and reject equal visual weight by default. Making one more prominent than the other requires deliberately overriding the styles — it's not the out-of-the-box behavior.

## Packages

This is a monorepo containing:

| Package | Description |
|---|---|
| [`@venia-consent/core`](./packages/core) | Framework-agnostic consent state, persistence, and script-gating engine |
| [`@venia-consent/react`](./packages/react) | React bindings — provider, hooks, and default UI components |
| [`@venia-consent/theme`](./packages/theme) | Stylesheets implementing the equal-weight design |

## Quickstart (React / Next.js)

```bash
bun add @venia-consent/react
```

```tsx
import { VeniaProvider } from '@venia-consent/react';
import '@venia-consent/theme/default.css';

export default function RootLayout({ children }) {
  return (
    <VeniaProvider config={{ categories: ['necessary', 'functional', 'analytics', 'marketing'] }}>
      {children}
    </VeniaProvider>
  );
}
```

Gate a third-party script behind consent:

```html
<script type="text/plain" data-venia-category="analytics" src="https://example.com/analytics.js"></script>
```

The script only executes once the `analytics` category is granted.

## What Venia does

- Persists consent choices with a versioned schema — bumping `version` invalidates prior consent and re-prompts users, so config changes don't silently rely on stale consent
- Blocks non-essential scripts from executing until their category is granted
- Ships an accessible default UI (keyboard navigation, `aria-*` labeling, focus handling)
- Gives every category equal button weight by default — no visually-emphasized "Accept All"

## What Venia doesn't do

Venia is not a substitute for legal review of your own compliance obligations. It implements consent-gating mechanics — it doesn't audit your cookie inventory, generate a privacy policy, or guarantee compliance with any specific regulation. **This is not legal advice.**

## Status

Early / pre-1.0. APIs may change between minor versions until a `1.0.0` release. See each package's README for its own status notes.

## License

MIT
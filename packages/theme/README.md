# @venia-consent/theme

Stylesheets for `@venia-consent/react`'s banner, card, modal, and customize menu.

## Install

```bash
bun add @venia-consent/theme
```

## Usage

Import exactly one theme:

```ts
import '@venia-consent/theme/sunset.css';
```

## Available themes

| Theme | File |
|---|---|
| Default | `default.css` |
| Forest | `forest.css` |
| High contrast | `high-contrast.css` |
| Nord | `nord.css` |
| Solarized | `solarized.css` |
| Sunset | `sunset.css` |

`high-contrast.css` is intended for accessibility-focused deployments — higher contrast ratios throughout, larger focus outlines.

## Custom theming

Every theme is built on the same set of CSS custom properties, so you can start from any theme file and override individual variables rather than writing a stylesheet from scratch:

```css
:root {
  --venia-bg: #ffffff;
  --venia-fg: #111111;
  --venia-border: #e5e5e5;
  --venia-btn-bg: #f5f5f5;
  --venia-btn-bg-hover: #eaeaea;
  --venia-toggle-on: #4a9eff;
  --venia-toggle-off: #d0d0d0;
  --venia-focus: #6ea8fe;
}
```

No Tailwind or build-time dependency — plain CSS, works regardless of what your app uses internally.

## License

MIT
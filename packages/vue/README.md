# @venia-consent/vue

Vue 3 bindings for [`@venia-consent/core`](../core) — a provider component and a `useConsent()` composable.

## Install

```bash
bun add @venia-consent/vue @venia-consent/core @venia-consent/theme
```

## Usage

```vue
<!-- App.vue or your root layout -->
<script setup>
import { VeniaProvider } from '@venia-consent/vue'
import '@venia-consent/theme/sunset.css'
import { veniaConfig } from './venia.config'
</script>

<template>
  <VeniaProvider :config="veniaConfig" mode="modal">
    <RouterView />
  </VeniaProvider>
</template>
```

Read or update consent in any descendant component:

```vue
<script setup>
import { useConsent } from '@venia-consent/vue'

const { store, consent } = useConsent()
</script>

<template>
  <button @click="store.updateConsent({ ...consent?.categories, analytics: false })">
    Manage cookie preferences
  </button>
</template>
```

## API

### `<VeniaProvider :config :mode>`

Wraps your app, initializes the consent store and script gate, and renders the default banner/card/modal until consent is decided. Once decided, swaps to a persistent settings icon.

| Prop     | Type                            | Default      |
| -------- | ------------------------------- | ------------ |
| `config` | `VeniaConfig`                   | — (required) |
| `mode`   | `'banner' \| 'card' \| 'modal'` | `'banner'`   |

### `useConsent()`

Returns `{ store, consent }`. Must be called from a component rendered inside `<VeniaProvider>`.

- `store` — the underlying `ConsentStore` instance (see `@venia-consent/core`)
- `consent` — a readonly `Ref<ConsentState | null>`, reactive to changes

## Async initialization

`ConsentStore.create()` is asynchronous (it may fetch remote config, and reads existing consent from cookies/storage). `<VeniaProvider>` doesn't render its consent UI until initialization completes — your app's own content (the default slot) renders immediately, only the banner/modal itself waits.

## Peer dependencies

- `vue` ^3.3

## License

MIT

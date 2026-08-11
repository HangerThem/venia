<script setup lang="ts">
import { ref, shallowRef, provide, onMounted, onUnmounted } from 'vue'
import { ConsentStore, initScriptGate } from '@venia-consent/core'
import type { VeniaConfig, ConsentState } from '@venia-consent/core'
import { VeniaKey } from './useConsent'
import ConsentComponent from './components/ConsentComponent.vue'

const props = withDefaults(
  defineProps<{ config: VeniaConfig; mode?: 'banner' | 'card' | 'modal' }>(),
  { mode: 'banner' },
)

const store = shallowRef<ConsentStore | null>(null)
const consent = ref<ConsentState | null>(null)
let unsubscribe: (() => void) | null = null

onMounted(async () => {
  const s = await ConsentStore.create(props.config)
  store.value = s
  consent.value = s.getConsent()
  initScriptGate(s)
  unsubscribe = s.onChange((state) => {
    consent.value = state
  })
})

onUnmounted(() => unsubscribe?.())

provide(VeniaKey, {
  get store() {
    if (!store.value) throw new Error('Venia store not yet initialized')
    return store.value
  },
  consent,
} as unknown as { store: ConsentStore; consent: typeof consent })
</script>

<template>
  <slot />
  <ConsentComponent v-if="store" :store="store" :mode="mode" />
</template>

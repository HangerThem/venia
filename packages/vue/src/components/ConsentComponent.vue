<script setup lang="ts">
import { Cookie } from '@lucide/vue'

import type { ConsentState, ConsentStore } from '@venia-consent/core'

import ConsentBanner from './ConsentBanner.vue'
import ConsentCard from './ConsentCard.vue'
import ConsentModal from './ConsentModal.vue'

const props = defineProps<{
  store: ConsentStore
  consent: ConsentState | null
  mode?: 'banner' | 'card' | 'modal'
}>()

const rejectAll = () => props.store.resetConsent()
</script>

<template>
  <button v-if="consent !== null" class="venia-reset" @click="rejectAll">
    <Cookie />
  </button>

  <ConsentBanner v-else-if="mode === 'banner' || !mode" :store="store" />
  <ConsentCard v-else-if="mode === 'card'" :store="store" />
  <ConsentModal v-else :store="store" />
</template>

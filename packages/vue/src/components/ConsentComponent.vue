<script setup lang="ts">
import { Cookie } from '@lucide/vue'

import type { ConsentStore } from '@venia-consent/core'

import ConsentBanner from './ConsentBanner.vue'
import ConsentCard from './ConsentCard.vue'
import ConsentModal from './ConsentModal.vue'

const props = defineProps<{
  store: ConsentStore
  mode?: 'banner' | 'card' | 'modal'
}>()

const rejectAll = () => props.store.resetConsent()
</script>

<template>
  <button v-if="store.hasDecided()" class="venia-reset" @click="rejectAll">
    <Cookie />
  </button>

  <ConsentBanner v-else-if="mode === 'banner' || !mode" :store="store" />
  <ConsentCard v-else-if="mode === 'card'" :store="store" />
  <ConsentModal v-else :store="store" />
</template>

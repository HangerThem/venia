<script setup lang="ts">
import { computed } from 'vue'
import type { ConsentStore } from '@venia-consent/core'

import ConsentCategoryList from './ConsentCategoryList.vue'
import { useConsentCategories } from '../useConsentCategories'

const props = defineProps<{ store: ConsentStore }>()
const { categories, selected, toggle, save } = useConsentCategories(props.store)
const config = computed(() => props.store.getConfig())

const rejectAll = () => props.store.rejectAll()
const acceptAll = () => props.store.acceptAll()
const savePreferences = () => save()
</script>

<template>
  <div class="venia-modal-backdrop" role="presentation">
    <div class="venia-modal" role="dialog" aria-modal="true" aria-label="Cookie consent">
      <h2 class="venia-heading">
        {{ config.bannerHeading ?? 'This site uses cookies' }}
      </h2>
      <p class="venia-content">
        {{
          config.bannerText ??
          'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.'
        }}
      </p>

      <div class="venia-customize">
        <ConsentCategoryList :categories="categories" :selected="selected" :on-toggle="toggle" />
      </div>

      <div class="venia-actions">
        <button class="venia-btn" @click="rejectAll">Reject all</button>
        <button class="venia-btn" @click="acceptAll">Accept all</button>
        <button class="venia-btn venia-btn--ghost venia-btn--save" @click="savePreferences">
          Save preferences
        </button>
      </div>
    </div>
  </div>
</template>

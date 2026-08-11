<script setup lang="ts">
import type { ConsentCategories, ConsentCategory } from '@venia-consent/core'

import type { ConsentCategoryItem } from '../useConsentCategories'

const props = defineProps<{
  categories: ConsentCategoryItem[]
  selected: ConsentCategories
  onToggle: (categoryId: ConsentCategory, isChecked: boolean) => void
  compact?: boolean
}>()

const toggleCategory = (category: ConsentCategoryItem) => {
  props.onToggle(category.id, !props.selected[category.id])
}
</script>

<template>
  <ul :class="compact ? 'venia-category-list venia-category-list--compact' : 'venia-category-list'">
    <li v-for="category in categories" :key="category.id" class="venia-category-row">
      <div class="venia-category-text">
        <p class="venia-category-label">{{ category.label }}</p>
        <p v-if="!compact && category.description" class="venia-category-desc">
          {{ category.description }}
        </p>
      </div>

      <button
        class="venia-toggle"
        role="switch"
        :aria-checked="selected[category.id]"
        :aria-label="`Toggle ${category.label} cookies`"
        :data-checked="selected[category.id] ? 'true' : 'false'"
        :data-locked="category.id === 'necessary' ? 'true' : 'false'"
        :disabled="category.id === 'necessary'"
        @click.prevent="toggleCategory(category)"
      >
        <span class="venia-toggle-thumb" />
      </button>
    </li>
  </ul>
</template>

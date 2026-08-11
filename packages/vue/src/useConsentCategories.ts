import { computed, ref } from 'vue'

import { type ConsentCategories, type ConsentCategory, type ConsentStore } from '@venia-consent/core'
import { defaultCategories } from '@venia-consent/core'

export interface ConsentCategoryItem {
	id: ConsentCategory
	label: string
	description: string
}

/**
 * Resolves the active categories from store config and tracks local
 * selection state until the user saves or accepts/rejects.
 *
 * Shared by ConsentBanner, ConsentModal, and ConsentCard so category
 * resolution and toggle behavior stay identical across all three surfaces.
 */
export function useConsentCategories(store: ConsentStore) {
	const config = computed(() => store.getConfig())

	const categories = computed<ConsentCategoryItem[]>(() => {
		return (
			config.value.categories?.map((category) => {
				const categoryConfig = config.value.categoryLabels?.[category]

				return {
					id: category as ConsentCategory,
					label: categoryConfig?.label ?? defaultCategories[category]?.label ?? category,
					description:
						categoryConfig?.description ?? defaultCategories[category]?.description ?? '',
				}
			}) ?? []
		)
	})

	const selected = ref<ConsentCategories>({} as ConsentCategories)

	const syncSelected = () => {
		selected.value = categories.value.reduce((acc, category) => {
			acc[category.id] =
				category.id === 'necessary'
					? true
					: (store.getConsent()?.categories?.[category.id] ?? false)
			return acc
		}, {} as ConsentCategories)
	}

	syncSelected()

	const toggle = (categoryId: ConsentCategory, isChecked: boolean) => {
		selected.value = {
			...selected.value,
			[categoryId]: isChecked,
		}
	}

	const save = () => {
		store.updateConsent(selected.value)
	}

	return { categories, selected, toggle, save }
}

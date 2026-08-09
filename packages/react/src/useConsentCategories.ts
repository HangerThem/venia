'use client'

import { useMemo, useState } from 'react'

import { ConsentCategory, type ConsentStore } from '@venia/core'

import { defaultCategories } from '@venia/core'

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
	const categories = useMemo<ConsentCategoryItem[]>(() => {
		const config = store.getConfig()

		return (
			config.categories?.map((category) => {
				const categoryConfig = config.categoryLabels?.[category]

				return {
					id: category as ConsentCategory,
					label: categoryConfig?.label ?? defaultCategories[category]?.label ?? category,
					description:
						categoryConfig?.description ?? defaultCategories[category]?.description ?? '',
				}
			}) ?? []
		)
	}, [store])

	const [selected, setSelected] = useState<Record<ConsentCategory, boolean>>(
		() =>
			categories.reduce(
				(acc, category) => {
					acc[category.id] =
						category.id === 'necessary'
							? true
							: (store.getConsent()?.categories?.[category.id] ?? false)
					return acc
				},
				{} as Record<ConsentCategory, boolean>,
			) ?? {},
	)

	const toggle = (categoryId: ConsentCategory, isChecked: boolean) => {
		setSelected((prev) => ({
			...prev,
			[categoryId]: isChecked,
		}))
	}

	const save = () => {
		store.updateConsent(selected)
	}

	return { categories, selected, toggle, save }
}
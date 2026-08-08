'use client';

import { useState } from 'react';
import type { ConsentCategory } from '@venia/core';

const CATEGORY_LABELS: Record<ConsentCategory, { label: string; description: string; locked?: boolean }> = {
  necessary: {
    label: 'Necessary',
    description: 'Required for the site to function. Cannot be disabled.',
    locked: true,
  },
  functional: {
    label: 'Functional',
    description: 'Remembers preferences like language and region.',
  },
  analytics: {
    label: 'Analytics',
    description: 'Helps us understand how the site is used, anonymously.',
  },
  marketing: {
    label: 'Marketing',
    description: 'Used to show relevant ads and measure their performance.',
  },
};

interface CustomizeMenuProps {
  categories: ConsentCategory[];
  categoryLabels?: Partial<Record<ConsentCategory, { label: string; description: string; locked?: boolean }>>;
  initial?: Partial<Record<ConsentCategory, boolean>>;
  onSave: (categories: Record<ConsentCategory, boolean>) => void;
  onBack: () => void;
}

export function CustomizeMenu({ categories, categoryLabels, initial, onSave, onBack }: CustomizeMenuProps) {
  const [selected, setSelected] = useState<Record<ConsentCategory, boolean>>(() =>
    categories.reduce((acc, c) => ({
      ...acc,
      [c]: c === 'necessary' ? true : (initial?.[c] ?? false),
    }), {} as Record<ConsentCategory, boolean>)
  );

  const toggle = (category: ConsentCategory) => {
    if (CATEGORY_LABELS[category].locked) return;
    setSelected((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="venia-customize" role="dialog" aria-label="Customize cookie preferences">
      <button className="venia-back" onClick={onBack} aria-label="Back">
        ← Back
      </button>

      <ul className="venia-category-list">
        {categories.map((category) => {
          const meta = categoryLabels?.[category] || CATEGORY_LABELS[category];
          return (
            <li key={category} className="venia-category-row">
              <div className="venia-category-text">
                <span className="venia-category-label">{meta.label}</span>
                <span className="venia-category-desc">{meta.description}</span>
              </div>
              <button
                role="switch"
                aria-checked={selected[category]}
                aria-label={`Toggle ${meta.label}`}
                className="venia-toggle"
                data-checked={selected[category]}
                data-locked={meta.locked}
                onClick={() => toggle(category)}
                disabled={meta.locked}
              >
                <span className="venia-toggle-thumb" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="venia-customize-actions">
        <button className="venia-btn" onClick={() => onSave(selected)}>
          Save preferences
        </button>
      </div>
    </div>
  );
}
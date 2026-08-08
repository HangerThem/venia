'use client';

import { useState } from 'react';
import type { ConsentStore } from '@venia/core';
import { CustomizeMenu } from './CustomizeMenu';

export function ConsentBanner({ store, mode = 'banner' }: { store: ConsentStore; mode: 'banner' | 'card' | 'modal' }) {
  const [view, setView] = useState<'banner' | 'customize'>('banner');
  
  if (store.hasDecided()) {
    return (
      <button className="venia-reset" onClick={() => store.resetConsent()}>
        V
      </button>
    );
  }

  if (view === 'customize') {
    return (
      <div className="venia-banner">
        <CustomizeMenu
          categories={store.getCategories()}
          categoryLabels={store.getCategoryLabels()}
          onSave={(categories) => store.updateConsent(categories)}
          onBack={() => setView('banner')}
        />
      </div>
    );
  }

  return (
    <div className={`venia-banner ${mode}`} role="dialog" aria-label="Cookie consent">
      <div className="venia-wrapper">
        <p>We use cookies. Choose what you're okay with.</p>
        <div className="venia-actions">
          <button className="venia-btn" onClick={() => store.rejectAll()}>Reject all</button>
          <button className="venia-btn" onClick={() => store.acceptAll()}>Accept all</button>
          <button className="venia-btn venia-btn--ghost" onClick={() => setView('customize')}>
            Customize
          </button>
        </div>
      </div>
    </div>
  );
}
import { writeFileSync, existsSync } from 'node:fs';
import * as p from '@clack/prompts';

interface InitAnswers {
  categories: string[];
  theme: string;
  mode: 'banner' | 'card' | 'modal';
}

const CONFIG_PATH = 'venia.config.ts';

export function writeConfig({ categories, theme, mode }: InitAnswers) {
  if (existsSync(CONFIG_PATH)) {
    p.log.warn(`${CONFIG_PATH} already exists — skipping (delete it first if you want to regenerate).`);
    return;
  }

  const categoryList = categories.map((c) => `'${c}'`).join(', ');

  const contents = `import type { VeniaConfigObject } from '@venia-consent/core';

export const veniaConfig: VeniaConfigObject = {
  categories: [${categoryList}],
  cookieName: 'venia-consent',
  version: 1,
};
`;

  writeFileSync(CONFIG_PATH, contents, 'utf-8');
  p.log.success(`Created ${CONFIG_PATH}`);
}

// Exported separately so init.ts can pass theme/mode into the printed snippet
// without re-deriving them.
export function configMeta(theme: string, mode: string) {
  return { theme, mode };
}
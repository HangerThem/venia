import type { VeniaConfig } from '@venia/core'

export const veniaConfig: VeniaConfig = {
  categories: ['necessary', 'functional', 'analytics', 'marketing'],
  categoryLabels: {
    necessary: {
      label: 'Necessary',
      description: 'These cookies are essential.',
    },
  },
  scripts: {
    testScript: {
      src: '/marketing.js',
      category: 'marketing',
    },
  },
  bannerHeading: 'We use cookies to enhance your experience.',
  bannerText: 'By continuing to visit this site you agree to our use of cookies.',
  cookieName: 'venia-consent',
  version: 1,
}

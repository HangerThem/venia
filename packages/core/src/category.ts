import { ConsentCategory } from "./types";

export const defaultCategories: Record<ConsentCategory, { label: string; description: string }> = {
  necessary: {
    label: 'Necessary',
    description: 'These cookies are essential for the website to function properly.',
  },
  functional: {
    label: 'Functional',
    description: 'These cookies enable enhanced functionality and personalization.',
  },
  analytics: {
    label: 'Analytics',
    description: 'These cookies collect information about how the website is used.',
  },
  marketing: {
    label: 'Marketing',
    description: 'These cookies are used to deliver personalized advertising content.',
  },
}
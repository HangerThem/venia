import type { ConsentStore } from './consent-store'
import type { ConsentCategory } from './types'

interface ScriptTarget {
  id: string
  src?: string
  inlineContent?: string
  category: ConsentCategory
  attrs?: Record<string, string>
}

const runScript = (target: ScriptTarget & { _el?: HTMLScriptElement }) => {
  if (document.querySelector(`script[data-venia-id="${target.id}"]`)) {
    return
  }

  const script = document.createElement('script')
  script.setAttribute('data-venia-category', target.category)
  script.setAttribute('data-venia-id', target.id)

  if (target.attrs) {
    Object.entries(target.attrs).forEach(([k, v]) => script.setAttribute(k, v))
  }

  if (target.src) {
    script.src = target.src
  } else if (target.inlineContent) {
    script.text = target.inlineContent
  } else {
    return
  }

  if (target._el) {
    target._el.replaceWith(script)
  } else {
    document.body.appendChild(script)
  }
}

export function initScriptGate(store: ConsentStore) {
  const activated = new Set<string>()

  const collectConfigScripts = (): ScriptTarget[] =>
    Object.entries(store.getConfig().scripts ?? {}).map(([id, def]) => ({
      id: `config:${id}`,
      src: def.src,
      category: def.category,
    }))

  const collectInlineScripts = (): ScriptTarget[] =>
    Array.from(
      document.querySelectorAll<HTMLScriptElement>(
        'script[type="text/plain"][data-venia-category]',
      ),
    ).map((el, i) => ({
      id: el.dataset.veniaId ?? `inline:${i}:${el.src || el.textContent?.slice(0, 40)}`,
      src: el.src || undefined,
      inlineContent: el.src ? undefined : el.text,
      category: el.dataset.veniaCategory as ConsentCategory,
      attrs: Object.fromEntries(
        [...el.attributes]
          .filter((a) => !['type', 'data-venia-category', 'data-venia-id'].includes(a.name))
          .map((a) => [a.name, a.value]),
      ),
      _el: el,
    })) as (ScriptTarget & { _el: HTMLScriptElement })[]

  const activate = () => {
    const state = store.getConsent()
    if (!state) return

    const targets = [...collectConfigScripts(), ...collectInlineScripts()]

    targets.forEach((target) => {
      const shouldActivate = state.categories[target.category] ?? false
      if (!shouldActivate || activated.has(target.id)) return

      runScript(target)
      activated.add(target.id)
    })
  }

  store.onChange(activate)
  activate()
}

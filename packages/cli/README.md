# @venia-consent/cli

Scaffolding CLI for Venia — wires up the provider, picks a theme, and generates a starter config in your app.

## Usage

No install needed — run directly:

```bash
npx @venia-consent/cli init
# or
bunx @venia-consent/cli init
```

## What `init` does

1. Detects your framework (Next.js App Router, Pages Router, or Vite + React) and package manager (bun, pnpm, yarn, or npm)
2. Prompts for consent categories, a theme, and a display mode (banner / card / modal)
3. Installs `@venia-consent/react` and `@venia-consent/theme`
4. Generates a `venia.config.ts` in your project root
5. Prints the exact snippet to paste into your root layout/entry file

## Why it doesn't auto-edit your layout file

Editing an existing `layout.tsx` or `App.tsx` programmatically risks corrupting a file that doesn't match the expected shape (custom formatting, unusual structure). The CLI generates config and installs dependencies, but leaves the final wiring step — pasting one snippet — to you, so nothing in your codebase is modified without you seeing exactly what changes.

## Supported frameworks

| Framework              | Auto-detected | Snippet provided                     |
| ---------------------- | ------------- | ------------------------------------ |
| Next.js (App Router)   | ✅            | ✅                                   |
| Next.js (Pages Router) | ✅            | ✅                                   |
| Vite + React           | ✅            | ✅                                   |
| Anything else          | —             | Generic React snippet, manual wiring |

## Testing note

If you're developing against this CLI locally (`bun link`), always test `init` from a directory with **no monorepo ancestry** — running it inside a workspace that declares its own `workspaces` field (like this repo's own `examples/` folder) causes npm/pnpm to resolve against the wrong context and can produce confusing `workspace:*` protocol errors unrelated to the CLI itself.

## License

MIT

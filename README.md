# Octane route modes

This is a small Octane project using `@octanejs/vite-plugin` as the compiler
integration. It demonstrates four distinct routes:

- `/ssr` renders `SsrPage` on the server and uses `<Hydrate>` with an
  interaction strategy for its deferred panel.
- `/ssg` is generated at build time with `octane/static`'s `prerender()` and
  is served without a client module.
- `/spa-one` and `/spa-two` are client-only Vite routes. Their links update the
  URL with `history.pushState` and switch the main content without a document
  request.
- Every route shares the same thin, full-width header with links to all four
  routes. SPA links stay client-side; SSR and SSG links perform normal document
  navigation.

The published Vite app layer currently treats every `RenderRoute` as SSR and
does not have a per-route SSG/SPA mode field. This project therefore keeps the
official `octane()` plugin for `.tsrx` compilation and uses the small scripts in
`scripts/` to make the four requested modes explicit.

```sh
pnpm dev
pnpm build
pnpm preview
pnpm check:routes
```

`check:routes` proves the server-side distinctions. In a browser, open `/ssr`,
confirm its label is in the initial document, then click the deferred button;
open `/ssg` and inspect that the document has no module script; finally open
`/spa-one` and use the shared header to switch to `/spa-two` without a page
load.

# Flamefront field guide

This Octane project is a compact, observable tour of Flamefront. The explicit
route graph in [`src/routes.ts`](src/routes.ts) drives matching, Remix Router,
SSR dispatch, static generation, browser-only routes, and hydration policy.
Navigation labels remain app display data in
[`src/navigation.ts`](src/navigation.ts).

The shared shell hosts six routes through Flamefront's `<Frame>` and keeps its
counter state during client navigation. `<Frame>` is the router-owned slot for
the matched child route. The generated graph imports each child as a separate
chunk, so route splitting needs no app-level `lazy()` wrapper.

- `/` uses SSR with full, immediate hydration.
- `/products/:productId` proves dynamic parameters, a server-only catalog
  dependency, and a generated interaction boundary.
- `/hydration` owns separate idle, visible, interaction, and media boundaries.
- `/server-static` uses `none`, leaving its server HTML inert inside the
  interactive shell.
- `/workspace` and `/workspace/settings` are browser-only routes with loader
  data fetched through Flamefront's data endpoint.

`/about` sits outside the shared shell. `ff build` prerenders it without a
client module.

The app uses `@octanejs/vite-plugin` for TSRX compilation and Flamefront for the
multi-mode lifecycle. It has no filesystem routing convention.

```sh
pnpm dev
pnpm build
pnpm preview
pnpm check:routes
pnpm exec ff routes
```

`ff routes` prints each path pattern, render mode, and hydration policy.
`check:routes` builds and probes every mode, verifies dynamic loader parameters,
checks that the `.server.ts` catalog marker is absent from client chunks, and
confirms that every framed route is a dynamic entry, and checks production
sourcemaps.

declare module "*.tsrx" {
  const Component: any

  export default Component
}

declare module "virtual:flamefront/remix-routes" {
  import type { RouteObject } from "@octanejs/remix-router"
  import type { NormalizedRoutingOptions } from "flamefront"

  export const routes: RouteObject[]
  export const routing: NormalizedRoutingOptions
  export function preloadRoute(entry: string): Promise<void>
}

declare module "virtual:flamefront/server-routes" {
  import type { RouteModule } from "flamefront/server"

  export function importRoute(entry: string): Promise<RouteModule>
}

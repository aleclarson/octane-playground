declare module 'virtual:flamefront/routes' {
	import type { RouteDefinition } from 'flamefront';

	export const routes: readonly RouteDefinition[];
	export const spaRoutes: readonly RouteDefinition[];
}

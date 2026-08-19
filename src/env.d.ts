declare module '*.tsrx' {
	const Component: any;
	export default Component;
}

declare module 'virtual:flamefront/remix-routes' {
	import type { RouteObject } from '@octanejs/remix-router';

	export const routes: RouteObject[];
}

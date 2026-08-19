import { Outlet, useLocation } from '@octanejs/remix-router';
import { navigationFor } from './navigation.ts';
import { app } from './routes.ts';
import { RouteHeader } from './RouteHeader.tsrx';

export function SpaLayout() @{
	const location = useLocation();

	<div class="app-shell">
		<RouteHeader activePath={location.pathname} spaNavigation />
		<Outlet />
	</div>
}

export function SpaPage() @{
	const location = useLocation();
	const currentRoute = app.match(location.pathname, { render: 'spa' })?.data;
	const currentNavigation = navigationFor(location.pathname);

	<main
		class="page"
		data-route={currentRoute?.path ?? location.pathname}
		data-render-mode={currentRoute?.render ?? 'spa'}
	>
		<section class="content">
			<p class="eyebrow">Octane Vite playground</p>
			<h1>{currentNavigation?.pageTitle ?? location.pathname}</h1>
			<p>
				This label is rendered by the browser-only Octane app. Use the header to
				switch between routes.
			</p>
		</section>
	</main>
}

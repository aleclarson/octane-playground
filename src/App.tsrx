import { defineRoute } from 'flamefront';
import { useEffect, useState } from 'octane';
import { spaRoutes } from 'virtual:flamefront/routes';
import { navigationFor } from './navigation.ts';
import { RouteHeader } from './RouteHeader.tsrx';

function normalizePath(pathname: string) {
	return spaRoutes.some((route) => route.path === pathname) ? pathname : spaRoutes[0]?.path ?? '/';
}

export function App() @{
	const [path, setPath] = useState(() => normalizePath(window.location.pathname));
	const currentRoute = spaRoutes.find((route) => route.path === path) ?? spaRoutes[0];
	const currentNavigation = navigationFor(currentRoute.path);

	useEffect(() => {
		const handlePopState = () => setPath(normalizePath(window.location.pathname));
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	});

	const navigate = (event: MouseEvent, nextPath: string) => {
		event.preventDefault();
		window.history.pushState({}, '', nextPath);
		setPath(nextPath);
	};

	<div class="app-shell">
		<RouteHeader activePath={currentRoute.path} onNavigate={navigate} />
		<main class="page" data-route={currentRoute.path} data-render-mode={currentRoute.render}>
			<section class="content">
				<p class="eyebrow">Octane Vite playground</p>
				<h1>{currentNavigation?.pageTitle ?? currentRoute.path}</h1>
				<p>
					This label is rendered by the browser-only Octane app. Use the header to
					switch between routes.
				</p>
			</section>
		</main>
	</div>
}

defineRoute(App, {
	path: '/spa-one',
	render: 'spa',
});

defineRoute(App, {
	path: '/spa-two',
	render: 'spa',
});

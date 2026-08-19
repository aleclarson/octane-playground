import { useEffect, useState } from 'octane';
import { matchRoute } from 'flamefront';
import { navigationFor } from './navigation.ts';
import { app } from './routes.ts';
import { RouteHeader } from './RouteHeader.tsrx';

const spaRoutes = app.routes.filter((route) => route.render === 'spa');

function normalizePath(pathname: string) {
	return matchRoute(spaRoutes, pathname) ? pathname : spaRoutes[0]?.path ?? '/';
}

export function App() @{
	const [path, setPath] = useState(() => normalizePath(window.location.pathname));
	const currentRoute = matchRoute(spaRoutes, path)?.data ?? spaRoutes[0];
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

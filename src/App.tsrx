import { useEffect, useState } from 'octane';
import { spaRoutes } from './route-manifest.js';
import { RouteHeader } from './RouteHeader.tsrx';

function normalizePath(pathname: string) {
	return spaRoutes.some((route) => route.path === pathname) ? pathname : '/spa-one';
}

export function App() @{
	const [path, setPath] = useState(() => normalizePath(window.location.pathname));
	const currentRoute = spaRoutes.find((route) => route.path === path) ?? spaRoutes[0];

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
		<main class="page" data-route={currentRoute.path} data-render-mode="spa">
			<section class="content">
				<p class="eyebrow">Octane Vite playground</p>
				<h1>{currentRoute.label as string}</h1>
				<p>
					This label is rendered by the browser-only Octane app. Use the header to
					switch between routes.
				</p>
			</section>
		</main>
	</div>
}

import { useEffect, useState } from 'octane';
import { spaRoutes } from './route-manifest.js';

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

	<main class="page" data-route={currentRoute.path} data-render-mode="spa">
		<nav class="route-nav" aria-label="SPA routes">
			@for (const route of spaRoutes; key route.path) {
				<a
					class={route.path === currentRoute.path ? 'active' : ''}
					href={route.path}
					onClick={(event) => navigate(event, route.path)}
				>
					{route.label as string}
				</a>
			}
		</nav>

		<section class="content">
			<p class="eyebrow">Octane Vite playground</p>
			<h1>{currentRoute.label as string}</h1>
			<p>
				This label is rendered by the browser-only Octane app. Use the links above
				to switch between the two SPA routes without a document request.
			</p>
		</section>
	</main>
}

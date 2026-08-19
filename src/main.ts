import { createRoot, hydrateRoot } from 'octane';
import { app } from './routes.ts';
import './styles.css';

const routeComponents = import.meta.glob('/src/*.tsrx', { import: 'default' });

const root = document.getElementById('root');

if (!root) {
	throw new Error('Octane route shell is missing #root.');
}

const routeMatch = app.match(window.location.pathname);

if (!routeMatch) {
	throw new Error(`No Flamefront route matches ${window.location.pathname}.`);
}

const importComponent = routeComponents[routeMatch.data.entry];
if (!importComponent) {
	throw new Error(`No Vite route component was generated for ${routeMatch.data.entry}.`);
}
const RouteComponent = (await importComponent()) as never;

if (routeMatch.data.render === 'ssr') {
	const loaderDataElement = document.getElementById('flamefront-loader-data');
	const loaderData = loaderDataElement?.textContent
		? JSON.parse(loaderDataElement.textContent)
		: undefined;
	hydrateRoot(root, RouteComponent, { loaderData });
} else {
	createRoot(root).render(RouteComponent);
}

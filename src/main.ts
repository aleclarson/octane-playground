import { hydrateRoot } from 'octane';
import { createClientRouter } from 'flamefront/remix-router';
import ClientRouter from './ClientRouter.tsrx';
import { app } from './routes.ts';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
	throw new Error('Octane route shell is missing #root.');
}

const routeMatch = app.match(window.location.pathname);

if (!routeMatch) {
	throw new Error(`No Flamefront route matches ${window.location.pathname}.`);
}

const hydrationData = (window as typeof window & {
	__staticRouterHydrationData?: unknown;
}).__staticRouterHydrationData;
const router = createClientRouter({ hydrationData });
hydrateRoot(root, ClientRouter, { router });

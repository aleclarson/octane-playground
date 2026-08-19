import { createRoot, hydrateRoot } from 'octane';
import { App } from './App.tsrx';
import { SsrPage } from './SsrPage.tsrx';
import { app } from './routes.ts';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
	throw new Error('Octane route shell is missing #root.');
}

const routeMatch = app.match(window.location.pathname);

if (routeMatch?.data.render === 'ssr') {
	hydrateRoot(root, SsrPage);
} else {
	createRoot(root).render(App);
}

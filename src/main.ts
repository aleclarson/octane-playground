import { createRoot, hydrateRoot } from 'octane';
import { App } from './App.tsrx';
import { SsrPage } from './SsrPage.tsrx';
import { app } from './routes.ts';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
	throw new Error('Octane route shell is missing #root.');
}

const ssrRoute = app.routes.find((route) => route.render === 'ssr');

if (window.location.pathname === ssrRoute?.path) {
	hydrateRoot(root, SsrPage);
} else {
	createRoot(root).render(App);
}

import { createRoot, hydrateRoot } from 'octane';
import { App } from './App.tsrx';
import { SsrPage } from './SsrPage.tsrx';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
	throw new Error('Octane route shell is missing #root.');
}

if (window.location.pathname === '/ssr') {
	hydrateRoot(root, SsrPage);
} else {
	createRoot(root).render(App);
}

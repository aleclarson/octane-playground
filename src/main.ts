import { createRoot, hydrateRoot } from 'octane';
import {
	consumeStaticRouterHydrationData,
	createClientRouter,
} from 'flamefront/remix-router';
import ClientRouter from './ClientRouter.tsrx';
import { app } from './app.ts';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
	throw new Error('Octane route shell is missing #root.');
}

const routeMatch = app.match(window.location.pathname);

if (!routeMatch) {
	throw new Error(`No Flamefront route matches ${window.location.pathname}.`);
}

const hydrationData = consumeStaticRouterHydrationData();
const router = createClientRouter({ hydrationData });
if (routeMatch.data.render !== 'client' && !router.state.initialized) {
	await new Promise<void>((resolve) => {
		const unsubscribe = router.subscribe((state) => {
			if (!state.initialized) return;
			unsubscribe();
			resolve();
		});
	});
}
if (routeMatch.data.render === 'client') {
	createRoot(root).render(ClientRouter, { router });
} else {
	hydrateRoot(root, ClientRouter, { router });
}

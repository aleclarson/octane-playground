import { createBrowserRouter } from '@octanejs/remix-router';
import { SpaLayout, SpaPage } from './SpaApp.tsrx';
import { app } from './routes.ts';

export const spaRouter = createBrowserRouter([
	{
		Component: SpaLayout,
		children: app.routes
			.filter((route) => route.render === 'spa')
			.map((route) => ({
				path: route.path,
				Component: SpaPage,
			})),
	},
]);

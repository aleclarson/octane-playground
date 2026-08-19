import { createBrowserRouter } from '@octanejs/remix-router';
import { SpaLayout, SpaPage } from './SpaApp.tsrx';
import { app } from './routes.ts';

export const spaRouter =
	typeof document === 'undefined'
		? null
		: createBrowserRouter([
				{
					Component: SpaLayout,
					children: app.routes
						.filter((route) => route.render === 'spa')
						.map((route) => ({
							path: route.path,
							loader: ({ request }: { request: Request }) => app.load(request.url),
							Component: SpaPage,
						})),
				},
			]);

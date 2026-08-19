import { defineApp, route } from 'flamefront';

export const app = defineApp({
	routes: [
		route('/ssr', '/src/SsrPage.tsrx', {
			render: 'ssr',
			hydration: 'deferred',
			navLabel: 'SSR',
			label: 'SSR route with deferred hydration',
		}),
		route('/ssg', '/src/SsgPage.tsrx', {
			render: 'ssg',
			hydration: 'none',
			navLabel: 'SSG',
			label: 'SSG route',
		}),
		route('/spa-one', '/src/App.tsrx', {
			render: 'spa',
			navLabel: 'SPA one',
			label: 'SPA route one',
		}),
		route('/spa-two', '/src/App.tsrx', {
			render: 'spa',
			navLabel: 'SPA two',
			label: 'SPA route two',
		}),
	],
});

export const routes = app.routes;
export const spaRoutes = routes.filter((route) => route.render === 'spa');

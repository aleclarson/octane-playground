import { defineApp, layout, route } from 'flamefront';

export const app = defineApp({
	routes: [
		layout('/src/SpaApp.tsrx', [
			route('/ssr', '/src/SsrPage.tsrx', {
				render: 'ssr',
				hydration: 'deferred',
			}),
			route('/spa-one', '/src/App.tsrx', {
				render: 'spa',
			}),
			route('/spa-two', '/src/App.tsrx', {
				render: 'spa',
			}),
		]),
		route('/ssg', '/src/SsgPage.tsrx', {
			render: 'ssg',
			hydration: 'none',
		}),
	],
});

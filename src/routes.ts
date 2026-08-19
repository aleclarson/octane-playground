import { defineApp, route } from 'flamefront';

export const app = defineApp({
	routes: [
		route('/ssr', '/src/SsrPage.tsrx', {
			render: 'ssr',
			hydration: 'deferred',
		}),
		route('/ssg', '/src/SsgPage.tsrx', {
			render: 'ssg',
			hydration: 'none',
		}),
		route('/spa-one', '/src/App.tsrx', {
			render: 'spa',
		}),
		route('/spa-two', '/src/App.tsrx', {
			render: 'spa',
		}),
	],
});

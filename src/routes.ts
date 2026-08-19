import { defineApp, layout, route } from 'flamefront';

export const app = defineApp({
	routes: [
		layout('/src/AppShell.tsrx', [
			route('/', '/src/HomePage.tsrx', {
				render: 'ssr',
				hydration: 'full',
			}),
			route('/products/:productId', '/src/ProductPage.tsrx', {
				render: 'ssr',
				hydration: { when: 'interaction', events: ['click', 'focusin'] },
			}),
			route('/hydration', '/src/HydrationLab.tsrx', {
				render: 'ssr',
				hydration: 'deferred',
			}),
			route('/server-static', '/src/ServerStaticPage.tsrx', {
				render: 'ssr',
				hydration: 'none',
			}),
			route('/workspace', '/src/WorkspacePage.tsrx', {
				render: 'spa',
			}),
			route('/workspace/settings', '/src/SettingsPage.tsrx', {
				render: 'spa',
			}),
		]),
		route('/about', '/src/AboutPage.tsrx', {
			render: 'ssg',
			hydration: 'none',
		}),
	],
});

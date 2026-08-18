export const routes = [
	{
		path: '/ssr',
		mode: 'ssr',
		label: 'SSR route with deferred hydration',
	},
	{
		path: '/ssg',
		mode: 'ssg',
		label: 'SSG route',
	},
	{
		path: '/spa-one',
		mode: 'spa',
		label: 'SPA route one',
	},
	{
		path: '/spa-two',
		mode: 'spa',
		label: 'SPA route two',
	},
];

export const spaRoutes = routes.filter((route) => route.mode === 'spa');

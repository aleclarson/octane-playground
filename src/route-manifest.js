export const routes = [
	{
		path: '/ssr',
		mode: 'ssr',
		navLabel: 'SSR',
		label: 'SSR route with deferred hydration',
	},
	{
		path: '/ssg',
		mode: 'ssg',
		navLabel: 'SSG',
		label: 'SSG route',
	},
	{
		path: '/spa-one',
		mode: 'spa',
		navLabel: 'SPA one',
		label: 'SPA route one',
	},
	{
		path: '/spa-two',
		mode: 'spa',
		navLabel: 'SPA two',
		label: 'SPA route two',
	},
];

export const spaRoutes = routes.filter((route) => route.mode === 'spa');

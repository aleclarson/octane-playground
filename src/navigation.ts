export type NavigationItem = {
	path: string;
	label: string;
	pageTitle: string;
};

export const navigation: readonly NavigationItem[] = [
	{
		path: '/ssr',
		label: 'SSR',
		pageTitle: 'SSR route with deferred hydration',
	},
	{
		path: '/ssg',
		label: 'SSG',
		pageTitle: 'SSG route',
	},
	{
		path: '/spa-one',
		label: 'SPA one',
		pageTitle: 'SPA route one',
	},
	{
		path: '/spa-two',
		label: 'SPA two',
		pageTitle: 'SPA route two',
	},
];

export function navigationFor(path: string) {
	return navigation.find((item) => item.path === path);
}

import { Link } from '@octanejs/remix-router';
import { navigation } from './navigation.ts';
import { app } from './routes.ts';

type RouteHeaderProps = {
	activePath: string;
	spaNavigation?: boolean;
};

export function RouteHeader({ activePath, spaNavigation = false }: RouteHeaderProps) @{
	<header class="site-header">
		<nav class="site-nav" aria-label="All routes">
			@for (const item of navigation; key item.path) {
				const route = app.routes.find((candidate) => candidate.path === item.path);
				const className = item.path === activePath ? 'active' : '';
				@if (spaNavigation && route?.render === 'spa') {
					<Link class={className} to={item.path}>{item.label}</Link>
				} @else {
					<a class={className} href={item.path}>{item.label}</a>
				}
			}
		</nav>
	</header>
}

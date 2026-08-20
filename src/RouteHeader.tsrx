import { Link } from '@octanejs/remix-router';
import { navigation } from './navigation.ts';
import { app } from './routes.ts';

type RouteHeaderProps = {
	activePath: string;
};

export function RouteHeader({ activePath }: RouteHeaderProps) @{
	<header class="site-header">
		<nav class="site-nav" aria-label="All routes">
			@for (const item of navigation; key item.path) {
				const route = app.match(item.path)?.data;
				const className = item.path === activePath ? 'active' : '';
				const linkName = item.path === '/'
					? 'home'
					: item.path.slice(1).replaceAll('/', '-');
				const prefetch = route?.render === 'static'
					? undefined
					: () => void app.prefetch(item.path);
				<Link
					class={className}
					data-route-link={item.path}
					data-testid={`nav-link-${linkName}`}
					to={item.path}
					onFocus={prefetch}
					onMouseEnter={prefetch}
				>
					{item.label}
				</Link>
			}
		</nav>
	</header>
}

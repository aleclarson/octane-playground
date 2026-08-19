import { Link } from '@octanejs/remix-router';
import { navigation } from './navigation.ts';
import { app } from './routes.ts';

type RouteHeaderProps = {
	activePath: string;
	clientNavigation?: boolean;
};

export function RouteHeader({ activePath, clientNavigation = false }: RouteHeaderProps) @{
	<header class="site-header">
		<nav class="site-nav" aria-label="All routes">
			@for (const item of navigation; key item.path) {
				const route = app.match(item.path)?.data;
				const className = item.path === activePath ? 'active' : '';
				const canMountInShell =
					clientNavigation && route?.render !== 'ssg' && route?.hydration !== 'none';
				@if (canMountInShell) {
					<Link
						class={className}
						to={item.path}
						onFocus={() => void app.prefetch(item.path)}
						onMouseEnter={() => void app.prefetch(item.path)}
					>
						{item.label}
					</Link>
				} @else {
					<a class={className} href={item.path}>{item.label}</a>
				}
			}
		</nav>
	</header>
}

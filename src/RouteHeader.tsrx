import { routes } from './route-manifest.js';

type RouteHeaderProps = {
	activePath: string;
	onNavigate?: (event: MouseEvent, nextPath: string) => void;
};

export function RouteHeader({ activePath, onNavigate }: RouteHeaderProps) @{
	const handleClick = (event: MouseEvent, nextPath: string) => {
		if (onNavigate && nextPath.startsWith('/spa-')) onNavigate(event, nextPath);
	};

	<header class="site-header">
		<nav class="site-nav" aria-label="All routes">
			@for (const route of routes; key route.path) {
				<a
					class={route.path === activePath ? 'active' : ''}
					href={route.path}
					onClick={(event) => handleClick(event, route.path)}
				>
					{route.navLabel as string}
				</a>
			}
		</nav>
	</header>
}

import { routes } from 'virtual:flamefront/routes';
import { navigation } from './navigation.ts';

type RouteHeaderProps = {
	activePath: string;
	onNavigate?: (event: MouseEvent, nextPath: string) => void;
};

export function RouteHeader({ activePath, onNavigate }: RouteHeaderProps) @{
	const handleClick = (event: MouseEvent, nextPath: string) => {
		const nextRoute = routes.find((route) => route.path === nextPath);
		if (onNavigate && nextRoute?.render === 'spa') onNavigate(event, nextPath);
	};

	<header class="site-header">
		<nav class="site-nav" aria-label="All routes">
			@for (const item of navigation; key item.path) {
				<a
					class={item.path === activePath ? 'active' : ''}
					href={item.path}
					onClick={(event) => handleClick(event, item.path)}
				>
					{item.label}
				</a>
			}
		</nav>
	</header>
}

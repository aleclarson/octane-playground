import { Outlet, useLocation } from '@octanejs/remix-router';
import { RouteHeader } from './RouteHeader.tsrx';

export function SpaLayout() @{
	const location = useLocation();

	<div class="app-shell">
		<RouteHeader activePath={location.pathname} spaNavigation />
		<Outlet />
	</div>
}

export default SpaLayout;

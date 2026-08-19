import { Outlet, useLocation } from '@octanejs/remix-router';
import { useState } from 'octane';
import { RouteHeader } from './RouteHeader.tsrx';

export function AppShell() @{
	const location = useLocation();
	const [shellCount, setShellCount] = useState(0);

	<div class="app-shell">
		<RouteHeader activePath={location.pathname} clientNavigation />
		<div class="shell-state" data-testid="shell-state">
			<span>Shared layout state</span>
			<button data-testid="shell-counter" onClick={() => setShellCount(shellCount + 1)}>
				{shellCount}
			</button>
		</div>
		<Outlet />
	</div>
}

export default AppShell;

import type { HydrationMode, RouteDefinition } from 'flamefront';
import { app } from './routes.ts';

type RouteFactsProps = {
	pathname: string;
	loader: string;
};

function hydrationLabel(route: RouteDefinition): string {
	const hydration = route.hydration;
	if (hydration === undefined) {
		if (route.render === 'static') return 'none by static mode';
		if (route.render === 'client') return 'full on client mount';
		return 'full';
	}
	if (typeof hydration === 'string') return hydration;
	return `${hydration.when} ${JSON.stringify(hydrationOptions(hydration))}`;
}

function hydrationOptions(hydration: Exclude<HydrationMode, string>): object {
	const { when: _when, ...options } = hydration;
	return options;
}

export function RouteFacts({ pathname, loader }: RouteFactsProps) @{
	const match = app.match(pathname);
	if (!match) return null;
	const route = match.data;

	<dl class="route-facts" data-testid="route-facts">
		<div>
			<dt>Render</dt>
			<dd>{route.render.toUpperCase()}</dd>
		</div>
		<div>
			<dt>Pattern</dt>
			<dd><code>{route.path}</code></dd>
		</div>
		<div>
			<dt>Hydration</dt>
			<dd>{hydrationLabel(route)}</dd>
		</div>
		<div>
			<dt>Loader</dt>
			<dd>{loader}</dd>
		</div>
	</dl>
}

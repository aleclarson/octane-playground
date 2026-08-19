import { useLoaderData } from '@octanejs/remix-router';
import type { LoaderArgs } from 'flamefront/server';
import { useState } from 'octane';
import { RouteFacts } from './RouteFacts.tsrx';

type SettingsData = {
	message: string;
	defaultCompact: boolean;
};

export async function loader({ request }: LoaderArgs): Promise<SettingsData> {
	return {
		message: `Browser fetched loader data for ${new URL(request.url).pathname}.`,
		defaultCompact: true,
	};
}

export function SettingsPage() @{
	const loaderData = useLoaderData() as SettingsData;
	const [compact, setCompact] = useState(loaderData.defaultCompact);

	<main class="page" data-route="/workspace/settings" data-render-mode="spa">
		<section class="content">
			<p class="eyebrow">Second browser route</p>
			<h1>Workspace settings</h1>
			<p>
				Move between this page and the workspace. The shared layout counter keeps
				its value because Remix Router retains the parent layout.
			</p>
			<RouteFacts pathname="/workspace/settings" loader={loaderData.message} />
			<div class="demo-action">
				<p data-testid="density-status">Density: {compact ? 'compact' : 'comfortable'}</p>
				<button data-testid="density-toggle" onClick={() => setCompact(!compact)}>
					Toggle density
				</button>
			</div>
		</section>
	</main>
}

export default SettingsPage;

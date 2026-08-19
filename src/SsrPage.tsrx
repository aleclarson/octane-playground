import { Hydrate } from 'octane';
import { interaction } from 'octane/hydration';
import type { LoaderArgs } from 'flamefront/server';
import { DeferredPanel } from './DeferredPanel.tsrx';
import { RouteHeader } from './RouteHeader.tsrx';

export type SsrLoaderData = {
	message: string;
};

export async function loader({ request }: LoaderArgs): Promise<SsrLoaderData> {
	return { message: `Loader resolved ${new URL(request.url).pathname} before SSR.` };
}

export function SsrPage({ loaderData }: { loaderData?: SsrLoaderData }) @{
	<div class="app-shell">
		<RouteHeader activePath="/ssr" />
		<main class="page" data-route="/ssr" data-render-mode="ssr">
			<section class="content">
				<p class="eyebrow">Octane server render</p>
				<h1>SSR route with deferred hydration</h1>
				<p>
					The heading and this panel arrive in the first server response. The panel
					stays inert until its interaction strategy activates it.
				</p>
				<p data-testid="loader-data">{loaderData?.message ?? 'Loader data unavailable.'}</p>
				<Hydrate when={interaction({ events: 'click' })}>
					<DeferredPanel />
				</Hydrate>
			</section>
		</main>
	</div>
}

export default SsrPage;

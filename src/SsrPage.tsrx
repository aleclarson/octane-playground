import { Hydrate } from 'octane';
import { interaction } from 'octane/hydration';
import { DeferredPanel } from './DeferredPanel.tsrx';

export function SsrPage() @{
	<main class="page" data-route="/ssr" data-render-mode="ssr">
		<section class="content">
			<p class="eyebrow">Octane server render</p>
			<h1>SSR route with deferred hydration</h1>
			<p>
				The heading and this panel arrive in the first server response. The panel
				stays inert until its interaction strategy activates it.
			</p>
			<Hydrate when={interaction({ events: 'click' })}>
				<DeferredPanel />
			</Hydrate>
		</section>
	</main>
}

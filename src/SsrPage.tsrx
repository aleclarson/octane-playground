import { useLoaderData } from '@octanejs/remix-router';
import type { LoaderArgs } from 'flamefront/server';
import { DeferredPanel } from './DeferredPanel.tsrx';

export type SsrLoaderData = {
	message: string;
};

export async function loader({ request }: LoaderArgs): Promise<SsrLoaderData> {
	return { message: `Loader resolved ${new URL(request.url).pathname} before SSR.` };
}

export function SsrPage() @{
	const loaderData = useLoaderData() as SsrLoaderData;

	<main class="page" data-route="/ssr" data-render-mode="ssr">
		<section class="content">
			<p class="eyebrow">Octane server render</p>
			<h1>SSR route with deferred hydration</h1>
			<p>
				The heading and this panel arrive in the first server response. The page
				stays inert until its generated interaction boundary activates it.
			</p>
			<p data-testid="loader-data">{loaderData.message}</p>
			<DeferredPanel />
		</section>
	</main>
}

export default SsrPage;

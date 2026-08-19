import type { LoaderArgs } from 'flamefront/server';
import { RouteHeader } from './RouteHeader.tsrx';

export type SsgLoaderData = {
	message: string;
};

export async function loader({ request }: LoaderArgs): Promise<SsgLoaderData> {
	return { message: `Loader resolved ${new URL(request.url).pathname} during the build.` };
}

export function SsgPage({ loaderData }: { loaderData?: SsgLoaderData }) @{
	<div class="app-shell">
		<RouteHeader activePath="/ssg" />
		<main class="page" data-route="/ssg" data-render-mode="ssg">
			<section class="content">
				<p class="eyebrow">Octane static generation</p>
				<h1>SSG route</h1>
				<p>
					This document is generated with Octane's <code>prerender</code> API during
					the production build and served without a client entry.
				</p>
				<p data-testid="loader-data">{loaderData?.message ?? 'Loader data unavailable.'}</p>
			</section>
		</main>
	</div>
}

export default SsgPage;

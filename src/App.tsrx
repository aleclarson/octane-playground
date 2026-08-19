import { useLoaderData, useLocation } from '@octanejs/remix-router';
import type { LoaderArgs } from 'flamefront/server';
import { navigationFor } from './navigation.ts';

export type SpaLoaderData = {
	message: string;
};

export async function loader({ request }: LoaderArgs): Promise<SpaLoaderData> {
	return { message: `Loader prefetched ${new URL(request.url).pathname}.` };
}

export function App() @{
	const location = useLocation();
	const loaderData = useLoaderData() as SpaLoaderData;
	const currentNavigation = navigationFor(location.pathname);

	<main class="page" data-route={location.pathname} data-render-mode="spa">
		<section class="content">
			<p class="eyebrow">Octane Vite playground</p>
			<h1>{currentNavigation?.pageTitle ?? location.pathname}</h1>
			<p>
				This label is rendered by the browser-only Octane app. Use the header to
				switch between routes.
			</p>
			<p data-testid="loader-data">{loaderData.message}</p>
		</section>
	</main>
}

export default App;

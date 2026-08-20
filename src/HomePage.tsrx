import { useLoaderData } from '@octanejs/remix-router';
import type { LoaderArgs } from 'flamefront/server';
import { useState } from 'octane';
import { RouteFacts } from './RouteFacts.tsrx';

type HomeLoaderData = {
	message: string;
};

export async function loader({ request }: LoaderArgs): Promise<HomeLoaderData> {
	return { message: `Rendered ${new URL(request.url).pathname} on the request server.` };
}

export function HomePage() @{
	const loaderData = useLoaderData() as HomeLoaderData;
	const [count, setCount] = useState(0);

	<main class="page" data-route="/" data-render-mode="ssr">
		<section class="content">
			<p class="eyebrow">Flamefront field guide</p>
			<h1>One graph, several ways to render</h1>
			<p>
				This route uses ordinary SSR and hydrates with the shared shell. The shell's
				<code>{'<Frame>'}</code> renders this lazy route chunk without an app-level
				<code>lazy()</code> wrapper. The other routes make server-only loaders,
				generated boundaries, static output, and browser navigation visible.
			</p>
			<RouteFacts pathname="/" loader={loaderData.message} />
			<div class="demo-action">
				<p data-testid="home-counter-status">Immediate counter: {count}</p>
				<button data-testid="home-counter" onClick={() => setCount(count + 1)}>
					Increment immediately
				</button>
			</div>
		</section>
	</main>
}

export default HomePage;

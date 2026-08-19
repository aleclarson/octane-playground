import type { LoaderArgs } from 'flamefront/server';
import { RouteFacts } from './RouteFacts.tsrx';
import { RouteHeader } from './RouteHeader.tsrx';

type AboutData = {
	message: string;
};

export async function loader({ request }: LoaderArgs): Promise<AboutData> {
	return { message: `Generated ${new URL(request.url).pathname} during ff build.` };
}

export function AboutPage({ loaderData }: { loaderData?: AboutData }) @{
	const message = loaderData?.message ?? 'Build loader data unavailable.';

	<div class="app-shell">
		<RouteHeader activePath="/about" />
		<main class="page" data-route="/about" data-render-mode="ssg">
			<section class="content">
				<p class="eyebrow">Static generation</p>
				<h1>Built once, served as a document</h1>
				<p>
					Flamefront runs this loader and Octane's <code>prerender()</code> during the
					production build. The result has no client module.
				</p>
				<RouteFacts pathname="/about" loader={message} />
				<p data-testid="about-static-proof">This page is complete HTML before srvx starts.</p>
			</section>
		</main>
	</div>
}

export default AboutPage;

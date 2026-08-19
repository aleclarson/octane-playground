import { defineRoute } from 'flamefront';
import { RouteHeader } from './RouteHeader.tsrx';

export function SsgPage() @{
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
			</section>
		</main>
	</div>
}

defineRoute(SsgPage, {
	path: '/ssg',
	render: 'ssg',
	hydration: 'none',
});

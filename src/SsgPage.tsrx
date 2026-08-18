export function SsgPage() @{
	<main class="page" data-route="/ssg" data-render-mode="ssg">
		<section class="content">
			<p class="eyebrow">Octane static generation</p>
			<h1>SSG route</h1>
			<p>
				This document is generated with Octane's <code>prerender</code> API during
				the production build and served without a client entry.
			</p>
		</section>

		<style>
			code {
				padding: 0.15rem 0.35rem;
				border-radius: 0.35rem;
				background: #e2e8f0;
				font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
			}
		</style>
	</main>
}

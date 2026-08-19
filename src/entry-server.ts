import { renderToString } from 'octane/server';
import { prerender } from 'octane/static';
import { createServerRouter } from 'flamefront/remix-router';
import { createSrvxServer, loadRoute, type RouteModule } from 'flamefront/server';
import StaticRouter from './StaticRouter.tsrx';
import { app } from './routes.ts';
import globalStyles from './styles.css?raw';

const routeModules = import.meta.glob([
	'/src/*.tsrx',
	'!/src/ClientRouter.tsrx',
	'!/src/StaticRouter.tsrx',
]);

async function importRoute(entry: string): Promise<RouteModule> {
	const importModule = routeModules[entry];
	if (!importModule) throw new Error(`No Vite route module was generated for ${entry}.`);
	return importModule() as Promise<RouteModule>;
}

function addRenderedBody(template: string, body: string, css: string) {
	const root = '<div id="root"></div>';

	if (!template.includes(root)) {
		throw new Error('The HTML shell must contain an empty <div id="root"></div>.');
	}

	return template
		.replace(root, `<div id="root">${body}</div>`)
		.replace('</head>', `${css}</head>`);
}

function staticDocument(body: string, css: string) {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Octane route modes</title>
    <style>${globalStyles}</style>
    ${css}
  </head>
  <body>
    <div id="root">${body}</div>
  </body>
</html>
`;
}

export async function renderSsrDocument(template: string, request: Request) {
	const route = app.match(request.url)?.data;
	if (!route || route.render !== 'ssr') throw new Response('Not found', { status: 404 });
	const result = await createServerRouter(request);
	if (result instanceof Response) throw result;
	const { html, css } = renderToString(StaticRouter, {
		router: result.router,
		context: result.context,
	});
	return addRenderedBody(template, html, css);
}

export async function renderSsgDocument(request: Request) {
	const loaded = await loadRoute(app, request, importRoute);
	if (!loaded || loaded.route.render !== 'ssg') throw new Response('Not found', { status: 404 });
	const { html, css } = await prerender(loaded.module.default as never, {
		loaderData: loaded.loaderData,
	});
	return staticDocument(html, css);
}

export async function loadRouteData(request: Request) {
	const requestUrl = new URL(request.url);
	const routeUrl = requestUrl.searchParams.get('url');
	if (!routeUrl) return new Response('Missing route URL.', { status: 400 });

	const loaded = await loadRoute(
		app,
		new Request(routeUrl, { headers: request.headers, signal: request.signal }),
		importRoute,
	);
	if (!loaded) return new Response('Not found.', { status: 404 });
	return Response.json(loaded.loaderData ?? null);
}

export default createSrvxServer({
	app,
	clientDirectory: new URL('../client/', import.meta.url),
	loadRouteData,
	renderSsrDocument,
});

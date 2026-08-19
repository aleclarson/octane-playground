import { renderToString } from 'octane/server';
import { prerender } from 'octane/static';
import { loadRoute, type RouteModule } from 'flamefront/server';
import { app } from './routes.ts';
import globalStyles from './styles.css?raw';

const routeModules = import.meta.glob('/src/*.tsrx');

async function importRoute(entry: string): Promise<RouteModule> {
	const importModule = routeModules[entry];
	if (!importModule) throw new Error(`No Vite route module was generated for ${entry}.`);
	return importModule() as Promise<RouteModule>;
}

function serializeLoaderData(loaderData: unknown) {
	return JSON.stringify(loaderData ?? null).replaceAll('<', '\\u003c');
}

function addRenderedBody(template: string, body: string, css: string, loaderData: unknown) {
	const root = '<div id="root"></div>';

	if (!template.includes(root)) {
		throw new Error('The HTML shell must contain an empty <div id="root"></div>.');
	}

	return template
		.replace(root, `<div id="root">${body}</div>`)
		.replace(
			'</head>',
			`${css}<script id="flamefront-loader-data" type="application/json">${serializeLoaderData(loaderData)}</script></head>`,
		);
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
	const loaded = await loadRoute(app, request, importRoute);
	if (!loaded || loaded.route.render !== 'ssr') throw new Response('Not found', { status: 404 });
	const { html, css } = renderToString(loaded.module.default as never, {
		loaderData: loaded.loaderData,
	});
	return addRenderedBody(template, html, css, loaded.loaderData);
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

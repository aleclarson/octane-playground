import { renderToString } from 'octane/server';
import { createServerRouter } from 'flamefront/remix-router';
import {
	createSrvxServer,
	loadRoute,
	type RenderedDocument,
	type RouteModule,
} from 'flamefront/server';
import StaticRouter from './StaticRouter.tsrx';
import { app } from './routes.ts';

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

export async function renderSsrDocument(template: string, request: Request) {
	const route = app.match(request.url)?.data;
	const shellRequest = new URL(request.url).searchParams.has('__flamefront_shell');
	if (!shellRequest && (!route || (route.render !== 'client' && route.render !== 'server'))) {
		throw new Response('Not found', { status: 404 });
	}
	const result = await createServerRouter(request);
	if (result instanceof Response) throw result;
	const { html, css } = renderToString(StaticRouter, {
		router: result.router,
		context: result.context,
	});
	return addRenderedBody(template, html, css);
}

export async function renderSsgDocument(template: string, request: Request) {
	const route = app.match(request.url)?.data;
	if (!route || route.render !== 'static') throw new Response('Not found', { status: 404 });
	const result = await createServerRouter(request);
	if (result instanceof Response) throw result;
	const { html, css } = renderToString(StaticRouter, {
		router: result.router,
		context: result.context,
	});
	const leaf = result.context.matches.at(-1);
	const document: RenderedDocument = {
		html: addRenderedBody(template, html, css),
		routeData: leaf?.route.id ? result.context.loaderData[leaf.route.id] ?? null : null,
		status: result.context.statusCode,
	};
	return document;
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
	renderSsgDocument,
});

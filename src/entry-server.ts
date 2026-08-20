import { renderToString } from 'octane/server';
import {
	createStaticRouter,
	isRouteErrorResponse,
} from '@octanejs/remix-router';
import { createServerRouter, routes as routeGraph } from 'flamefront/remix-router';
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

function serializeErrors(errors: Record<string, unknown> | null): Record<string, unknown> | null {
	if (!errors) return null;
	const serialized: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(errors)) {
		if (isRouteErrorResponse(value)) {
			serialized[key] = { ...value, __type: 'RouteErrorResponse' };
		} else if (value instanceof Error) {
			serialized[key] = {
				message: value.message,
				__type: 'Error',
				...(value.name !== 'Error' ? { __subType: value.name } : {}),
			};
		} else {
			serialized[key] = value;
		}
	}
	return serialized;
}

function staticRouterHydrationScript(context: any): string {
	const data = JSON.stringify({
		loaderData: context.loaderData,
		actionData: context.actionData,
		errors: serializeErrors(context.errors),
	});
	const escaped = JSON.stringify(data).replace(/[&><\u2028\u2029]/g, (character) => {
		const escapes: Record<string, string> = {
			'&': '\\u0026',
			'>': '\\u003e',
			'<': '\\u003c',
			' ': '\\u2028',
			' ': '\\u2029',
		};
		return escapes[character] ?? character;
	});
	return `<script>window.__staticRouterHydrationData = JSON.parse(${escaped});</script>`;
}

function addRenderedBody(template: string, body: string, css: string, hydrationScript: string) {
	const root = '<div id="root"></div>';

	if (!template.includes(root)) {
		throw new Error('The HTML shell must contain an empty <div id="root"></div>.');
	}

	return template
		.replace(root, `<div id="root">${body}</div>`)
		.replace('</head>', `${css}</head>`)
		.replace('</body>', `${hydrationScript}</body>`);
}

export async function renderSsrDocument(template: string, request: Request) {
	const route = app.match(request.url)?.data;
	const shellRequest = new URL(request.url).searchParams.has('__flamefront_shell');
	if (!shellRequest && (!route || (route.render !== 'client' && route.render !== 'server'))) {
		throw new Response('Not found', { status: 404 });
	}
	const result = shellRequest || route?.render === 'client'
		? await createShellRouter(request)
		: await createServerRouter(request);
	if (result instanceof Response) throw result;
	const { html, css } = renderToString(StaticRouter, {
		router: result.router,
		context: result.context,
	});
	return addRenderedBody(template, html, css, staticRouterHydrationScript(result.context));
}

async function createShellRouter(request: Request) {
	const url = new URL(request.url);
	const context = {
		basename: '/',
		location: {
			pathname: url.pathname,
			search: url.search,
			hash: url.hash,
			state: null,
			key: 'default',
		},
		matches: [{
			params: {},
			pathname: '',
			pathnameBase: '/',
			route: { ...routeGraph[0], id: '0' },
		}],
		loaderData: {},
		actionData: null,
		errors: null,
		statusCode: 200,
		loaderHeaders: {},
		actionHeaders: {},
	};
	return {
		context,
		router: createStaticRouter(routeGraph, context as any),
	};
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
		html: addRenderedBody(template, html, css, staticRouterHydrationScript(result.context)),
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

import { renderToString } from 'octane/server';
import { prerender } from 'octane/static';
import { SsgPage } from './SsgPage.tsrx';
import { SsrPage } from './SsrPage.tsrx';

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
    ${css}
  </head>
  <body>
    <div id="root">${body}</div>
  </body>
</html>
`;
}

export function renderSsrDocument(template: string) {
	const { html, css } = renderToString(SsrPage);
	return addRenderedBody(template, html, css);
}

export async function renderSsgDocument() {
	const { html, css } = await prerender(SsgPage);
	return staticDocument(html, css);
}

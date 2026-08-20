import { createOctaneServer } from 'flamefront/octane-server';
import { app } from './app.ts';

const entry = createOctaneServer({
	app,
	clientDirectory: new URL('../client/', import.meta.url),
});

export const { loadRouteData, renderSsrDocument, renderSsgDocument } = entry;
export default entry.server;

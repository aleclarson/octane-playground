import { RouterProvider } from '@octanejs/remix-router/dom';
import type { LoaderArgs } from 'flamefront/server';
import { spaRouter } from './spa-router.ts';

export type SpaLoaderData = {
	message: string;
};

export async function loader({ request }: LoaderArgs): Promise<SpaLoaderData> {
	return { message: `Loader prefetched ${new URL(request.url).pathname}.` };
}

export function App() @{
	if (!spaRouter) return null;
	<RouterProvider router={spaRouter} />
}

export default App;

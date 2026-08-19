import { RouterProvider } from '@octanejs/remix-router/dom';
import { spaRouter } from './spa-router.ts';

export function App() @{
	<RouterProvider router={spaRouter} />
}

import { RouterProvider } from '@octanejs/remix-router/dom';

export default function ClientRouter({ router }: { router: any }) @{
	<RouterProvider router={router} />
}

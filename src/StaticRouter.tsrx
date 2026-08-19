import { StaticRouterProvider } from '@octanejs/remix-router';

export default function StaticRouter({ router, context }: { router: any; context: any }) @{
	<StaticRouterProvider router={router} context={context} />
}

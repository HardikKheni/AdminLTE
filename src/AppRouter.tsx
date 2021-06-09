import React, { FC, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import SplashLoader from './theme/js/components/SplaceLoader';

interface AppRoute {
	name: string;
	path: string;
	exact?: boolean;
	component: React.LazyExoticComponent<React.FC<{}>> | React.FC<{}>;
	layout: React.LazyExoticComponent<React.FC<{}>> | React.FC<{}>;
	children?: Array<AppRoute>;
}

export const routes: Array<AppRoute> = [
	{
		path: '/',
		name: 'Home',
		component: lazy(() => import('./pages/Index')),
		exact: true,
		layout: lazy(() => import('./theme/js/layouts/MainLayout')),
	},
	{
		path: '/page1',
		name: 'Page1',
		component: lazy(() => import('./pages/Page1')),
		exact: true,
		layout: lazy(() => import('./theme/js/layouts/MainLayout')),
	},
	{
		path: '/page2',
		name: 'Page2',
		component: lazy(() => import('./pages/Page2')),
		exact: true,
		layout: lazy(() => import('./theme/js/layouts/MainLayout')),
	},
	{
		path: '/page3',
		name: 'Page3',
		component: lazy(() => import('./pages/Page3')),
		exact: true,
		layout: lazy(() => import('./theme/js/layouts/MainLayout')),
	},
	{
		path: '/login',
		name: 'Login',
		exact: true,
		component: lazy(() => import('./pages/Login')),
		layout: lazy(() => import('./theme/js/layouts/FullLayout')),
	},
	{
		name: 'Register',
		path: '/register',
		exact: true,
		component: lazy(() => import('./pages/Register')),
		layout: lazy(() => import('./theme/js/layouts/FullLayout')),
	},
];

const AppRouter: FC = () => {
	const t = routes.map((route, i) => <ConfigRoute key={i} {...route} />);
	return (
		<>
			{routes.length && (
				<Switch>
					<Suspense fallback={<SplashLoader />}>{t}</Suspense>
				</Switch>
			)}
		</>
	);
};

const ConfigRoute: FC<AppRoute> = ({
	component: Component,
	children,
	layout,
	...rest
}) => {
	const Layout = layout;
	return (
		<Route {...rest}>
			<Layout>
				<Component />
			</Layout>
		</Route>
	);
};

export default AppRouter;

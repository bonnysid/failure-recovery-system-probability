import React, { lazy } from 'react';

const MainPage = lazy(async () => import('@src/pages/Main'));

type Route = {
    path: string;
    exact?: boolean;
    element: React.ReactElement;
}

enum PublicRouteNames {
    MAIN = '/',
}

const publicRoutes: Route[] = [
    { path: PublicRouteNames.LOGIN, element: <LoginPage />, exact: true },
];

const privateRoutes: Route[] = [
    { path: PrivateRouteNames.USERS, element: <UsersPage />, exact: true },
    { path: PrivateRouteNames.POSTS, element: <PostsPage />, exact: true },
    { path: PrivateRouteNames.TAGS, element: <TagsPage />, exact: true },
    { path: PrivateRouteNames.ROLES, element: <RolesPage />, exact: true },
    { path: PrivateRouteNames.DIALOGS, element: <DialogsPage />, exact: true },
    { path: PrivateRouteNames.COMPLAINTS, element: <ComplaintsPage />, exact: true },
];

export { privateRoutes, publicRoutes, PublicRouteNames, PrivateRouteNames };
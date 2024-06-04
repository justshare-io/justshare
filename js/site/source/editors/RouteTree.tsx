import React from 'react';
import {Page, Route as ContentRoute} from "@/rpc/content/content_pb";

export type Route = {
    path: string
    page: Page
    children: Route[]
    contentRoute: ContentRoute
}

const addRoute = (r: ContentRoute, segments: string[], currentLevel: Route[]): Route[] => {
    if (segments.length === 0) return currentLevel;

    const segment = segments[0];

    return currentLevel.find(route => route.path === segment) ? (
        currentLevel.map(route =>
            route.path === segment
                ? ({
                    ...route,
                    children: addRoute(route.contentRoute, segments.slice(1), route.children)
                }) : route
        )
    ) : (
        [
            ...currentLevel,
            {
                path: segment,
                page: new Page(),
                children: addRoute(r, segments.slice(1), []),
                contentRoute: r,
            }
        ]
    );
}

export const parseRoutes = (routes: ContentRoute[]): Route[] => {
    return routes.reduce<Route[]>((acc, route) => {
        const segments = route.path.split('/').filter(Boolean);
        return addRoute(route, segments, acc);
    }, []);
}

export const RouteTreeView: React.FC<{
    routes: Route[],
    onRouteClick?: (route: Route) => void,
}> = ({ routes, onRouteClick }) => {
    return (
        <ul className="menu menu-xs bg-base-200 rounded-lg max-w-xs w-full">
            {routes.map((route, index) => (
                <RouteTree key={index} route={route} onRouteClick={onRouteClick} />
            ))}
        </ul>
    );
};

const RouteTree: React.FC<{
    route: Route,
    onRouteClick?: (route: Route) => void,
}> = ({ route, onRouteClick }) => {
    return (
        <li>
            {(route.children && route.children.length > 0) ? (
                <details open>
                    <summary onClick={() => {
                        if (onRouteClick) {
                            onRouteClick(route);
                        }
                    }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                            />
                        </svg>
                        {route.path}
                    </summary>
                    <ul>
                        {route.children.map((child, index) => (
                            <RouteTree key={index} route={child} onRouteClick={onRouteClick} />
                        ))}
                    </ul>
                </details>
            ) : (
                <a onClick={() => {
                    if (onRouteClick) {
                        onRouteClick(route);
                    }
                }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                    </svg>
                    {route.path}
                </a>
            )}
        </li>
    );
};

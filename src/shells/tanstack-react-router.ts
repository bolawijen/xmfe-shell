import { createRoot } from 'react-dom/client';
import { createElement, StrictMode } from 'react';

type ReactApp = Function;

export default function createRoutesTree(routeTree: any, basePath: string = ''): any[] {
  const routes: any[] = [];

  function traverse(node: any, currentPath: string) {
    // TanStack Router path can be absolute or relative. 
    // We handle it by joining if it's relative or just taking it if it's absolute.
    const path = node.path === '/' ? currentPath : `${currentPath}/${node.path}`.replace(/\/+/g, '/');

    if (node.children) {
      node.children.forEach((child: any) => traverse(child, path));
    } else {
      routes.push({
        path: path === '' ? '/' : path,
        // Add mapping to the component/page if needed by Shell
        component: node.options?.component || 'default'
      });
    }
  }

  traverse(routeTree, basePath);
  return routes;
}

function mount(App: ReactApp, container: HTMLElement) {
  createRoot(container).render(
    createElement(StrictMode, null,
      createElement(App)
    )
  );
}

export function createRouterModule(module: any) {
  return {
    bootstrap(container: Function) {
      return container && module.bootstrap((App: any) => {
        mount(App, container())
      })
    }
  }
}

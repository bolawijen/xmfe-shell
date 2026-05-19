import React, { useState, useEffect, useMemo, useRef, createElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UniversalPage } from '../Page';
import { registry } from '../Registry';

const UniversalBridge: React.FC<{ page: UniversalPage }> = ({ page }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (containerRef.current && !isMounted.current) {
      page.mount(containerRef.current);
      isMounted.current = true;
    }
    return () => {
      if (isMounted.current) {
        page.unmount();
        isMounted.current = false;
      }
    };
  }, [page]);

  return createElement('div', { 
    className: 'mfx-module-container', 
    ref: containerRef 
  });
};

function ShellApp() {
  const [modules, setModules] = useState(registry.getModules());

  useEffect(() => {
    return registry.subscribe(() => {
      setModules(registry.getModules());
    });
  }, []);

  const router = useMemo(() => {
    const routes = modules.flatMap(m => 
      m.routes.map(r => ({
        path: r.path,
        element: createElement(UniversalBridge, { page: r.page })
      }))
    );

    if (routes.length === 0) {
      routes.push({
        path: '/',
        element: createElement('div', null, 'Welcome to XMF Portal. Waiting for modules...')
      });
    }

    return createBrowserRouter(routes);
  }, [modules]);

  return createElement(RouterProvider, { router });
}

export function mount(target: HTMLElement) {
  const root = createRoot(target);
  root.render(
    createElement(StrictMode, null, 
      createElement(ShellApp)
    )
  );
  
  return {
    unmount: () => root.unmount()
  };
}

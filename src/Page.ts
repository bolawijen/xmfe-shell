export type Page = {
  mount: (container: HTMLElement) => void;
  unmount: () => void;
};

export type ModuleConfig = {
  name: string;
  routes: Array<{
    path: string;
    page: Page;
    layout?: 'admin' | 'auth' | 'default';
  }>;
  navs?: Array<{
    title: string;
    path: string;
    icon?: string;
    id?: string;
  }>;
};

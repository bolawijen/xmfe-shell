import Registry from './Registry';

export type ShellApp = {
  type: 'tsx' | 'svelte' | 'vue'
};


export const xmfe = {
  on(event: string, callback: Function) {
    window.addEventListener(`mfe:${event}`, (event: any) => {
      if (event.detail) callback?.(event.detail);
    });
  },
  emit(event: string, detail: any) {
    window.dispatchEvent(new CustomEvent(`xmfe:${event}`, { detail }))
  },
}

export function createShell(createModule: Function) {
  Registry.init(xmfe);
  const container = () => document.getElementById('root');
  return createModule().bootstrap(container);
}

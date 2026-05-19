import { ModuleConfig } from './Page';
import { routerMappers } from './routers';

class Registry {
    private modules: ModuleConfig[] = [];

    constructor() {
        // Start listening for modules immediately
        window.addEventListener('mfe:routes', (e: any) => {
            if (e.detail) this.register(e.detail);
        });
        window.addEventListener('mfe:module', (e: any) => {
            if (e.detail) this.register(e.detail);
        });
    }

    register = (config: { name: string, type: string, routeTree: any, mount: (el: HTMLElement) => void, unmount: () => void }) => {
        const mapper = routerMappers[config.type];
        if (!mapper) {
            console.error(`No mapper found for router type: ${config.type}`);
            return;
        }

        const mappedRoutes = mapper(config.routeTree);
        
        const moduleConfig: ModuleConfig = {
            name: config.name,
            routes: mappedRoutes.map(r => ({
                path: r.path,
                page: { mount: config.mount, unmount: config.unmount }
            }))
        };
        
        if (this.modules.find(m => m.name === moduleConfig.name)) return;
        this.modules.push(moduleConfig);
    };

    getModules = () => [...this.modules];
}

export const registry = new Registry();

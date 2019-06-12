import { Application } from '@feathersjs/feathers';

interface ConfigOptions {
    app: Application,
    frontend: {
        host: string,
        protocol: 'http' | 'https',
    }
}

/**
 * Feathers Application.
 */
export let App: Application;

/**
 * Configure Feathers Service Models.
 */
export const config = (options: ConfigOptions) => {
    App = options.app;
    App.set('frontend', {
        host: 'atshop.io',
        protocol: 'https',
        ...options.frontend,
    })
};
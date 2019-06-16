import { Application } from '@feathersjs/feathers';
import Models from '../interfaces/Models';

interface ConfigOptions {
    app: Application,
    frontend?: {
        host?: string,
        protocol?: 'http' | 'https',
    },
    models?: Partial<Models>,
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
    });

    if (options.models) {
        Object.entries(options.models).forEach(([modelName, model]) => {
            App.set(`atshop-service-models.model.${modelName}`, model);
        });
    }
};
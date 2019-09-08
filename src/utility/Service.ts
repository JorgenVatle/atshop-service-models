import { Application } from '@feathersjs/feathers';
import Models from '../interfaces/Models';

interface FrontendDetails {
    host?: string,
    protocol?: 'http' | 'https',
}

export interface ConfigOptions {
    app: Application,
    frontend?: FrontendDetails,
    legacyFrontend?: FrontendDetails,
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

    if (options.frontend || !App.get('frontend')) {
        App.set('frontend', {
            host: 'ats.gg',
            protocol: 'https',
            ...options.frontend,
        });
    }

    if (options.legacyFrontend || !App.get('legacyFrontend')) {
        App.set('legacyFrontend', {
            host: 'atshop.io',
            protocol: 'https',
            ...options.frontend,
        });
    }

    if (options.models) {
        Object.entries(options.models).forEach(([modelName, model]) => {
            App.set(`atshop-service-models.model.${modelName}`, model);
        });
    }
};
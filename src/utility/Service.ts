import { Application } from '@feathersjs/feathers';
import Models from '../interfaces/Models';

export interface HostConfig {
    host?: string;
    protocol?: 'http' | 'https';
}

export interface ConfigOptions {
    app: Application;
    models?: Partial<Models>;
    frontend?: HostConfig;
    legacyFrontend?: HostConfig;
    permalinkService?: HostConfig;
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
            ...options.legacyFrontend,
        });
    }

    if (options.permalinkService || !App.get('permalinkService')) {
        App.set('permalinkService', {
            host: 'redirect.atshop.io',
            protocol: 'https',
            ...options.permalinkService,
        })
    }

    if (options.models) {
        Object.entries(options.models).forEach(([modelName, model]) => {
            App.set(`atshop-service-models.model.${modelName}`, model);
        });
    }
};
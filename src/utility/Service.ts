import { Application } from '@feathersjs/feathers';

/**
 * Feathers Application.
 */
export let App: Application;

/**
 * Configure Feathers Service Models.
 */
export const config = (options: { app: Application }) => {
    App = options.app;
};
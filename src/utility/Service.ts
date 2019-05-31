import ModelDocument from '../interfaces/ModelDocument';
import { Application } from '@feathersjs/feathers';

/**
 * Feathers Application.
 */
export let App: Application;

/**
 * Class for ServiceModel to extend.
 */
export let BaseModel: {
    new(data: ModelDocument): any,
    [s: string]: any;
};

/**
 * Configure Feathers Service Models.
 */
export const config = (options: { app: Application, baseModel: any }) => {
    App = options.app;
    BaseModel = options.baseModel || class {}
};
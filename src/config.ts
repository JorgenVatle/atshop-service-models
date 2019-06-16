import { Application } from '@feathersjs/feathers';
import { config, ConfigOptions } from './utility/Service';
import { Omit } from './utility/TS';

/**
 * Configure package using existing Feathers instance.
 */
export default function ConfigureATShopServiceModels(options?: Omit<ConfigOptions, 'app'>) {
    return (app: Application) => {
        config({ app, ...options });
    }
}
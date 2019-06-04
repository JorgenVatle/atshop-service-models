import { Application, Id, Paginated, Params, Service } from '@feathersjs/feathers';
import ModelDocument from '../interfaces/ModelDocument';
import { NotFound } from '@feathersjs/errors';
import PaginatedServiceModel from './PaginatedServiceModel';
import { App } from '../utility/Service';

export type ServiceModelClass<T> = { new(data: ModelDocument): T };
export type AsyncKey = Id | Promise<Id>;

interface ServiceModel extends ModelDocument {
    entry: ModelDocument;
}

abstract class ServiceModel {

    /**
     * Model index signature.
     */
    [s: string]: any;

    /**
     * Feathers application.
     */
    public static get App(): Application {
        return App;
    };

    /**
     * Feathers service path.
     */
    public static servicePath: string;

    /**
     * Feathers service instance for this model.
     */
    public static get service(): Service<any> {
        return this.App.service(this.servicePath);
    }

    /**
     * Model constructor.
     */
    public constructor(data: ModelDocument) {
        this._renewEntry(data);
    }

    /**
     * Merge entry data with the current model.
     */
    protected _renewEntry(entry: ModelDocument) {
        this.entry = entry;

        Object.entries(entry).forEach(([key, value]) => {
            const set = () => { this[key] = value };
            let descriptorTarget = this;
            let descriptor;

            while(!descriptor && (descriptorTarget = Object.getPrototypeOf(descriptorTarget))) {
                descriptor = Object.getOwnPropertyDescriptor(descriptorTarget, key);
            }

            if (!descriptor) {
                return set();
            }

            if (typeof descriptor.set === 'function') {
                descriptor.set(value);
                return;
            }

            if (typeof descriptor.get === 'function') {
                return;
            }

            if (typeof descriptor.value === 'function') {
                return;
            }

            set();
        });

        this.entry = entry;
        return this;
    }

    /**
     * Query the database to re-fetch data for this model.
     */
    public async _renew(data?: ModelDocument) {
        // @ts-ignore
        this._renewEntry(data || await this.constructor.service.get(this._id));
    }

    /**
     * Merge and store the ServiceModel's in-database data with the given data.
     */
    public async patch(data: any): Promise<void> {
        // @ts-ignore
        const service = this.constructor.service;

        await this._renew(await service.patch(this._id, data));
    }

    /**
     * Register has-many relationship for the current model.
     */
    protected hasMany(model: typeof ServiceModel, foreignKey: string, localKey = this.entry._id) {
        const query: Params['query'] = {};
        query[foreignKey] = localKey;

        return new PaginatedServiceModel(model, query);
    }

    /**
     * Registers a relationship between the current model instance and the given ServiceModel instance.
     */
    protected belongsTo<T extends ServiceModel>(model: ServiceModelClass<T>, foreignKey: AsyncKey): Promise<T> {
        // @ts-ignore
        return model.get(foreignKey);
    }

    /**
     * Find a list of entries from the current service.
     */
    public static _find(query: Params['query']): Promise<Paginated<ModelDocument>> {
        return this.service.find({ query });
    }

    /**
     * Update the models on the current collection.
     */
    public static _patch(id: string | null, data: any, params?: Params) {
        return this.service.patch(id, data, params);
    }

    /**
     * Find and format a list of entries from the current service.
     */
    public static async find(query: Params) {
        return new PaginatedServiceModel(this, query);
    }

    /**
     * Fetch a single entry from the current service.
     */
    public static async get<T extends ServiceModel>(this: ServiceModelClass<T>, id: AsyncKey, query?: Params): Promise<T> {
        const self = <typeof ServiceModel><unknown>this;
        const result = await self.service.get(await id, query);

        if (!result) {
            throw new NotFound(`The requested entry could not be located!`, {
                id,
                query,
                service: self.servicePath,
            });
        }

        return new this(result);
    }

    /**
     * Insert an entry into the database.
     */
    public static async create(data: any, params?: Params) {
        // @ts-ignore
        return new this(
            await this.service.create(data, params)
        );
    }
}

export default ServiceModel;
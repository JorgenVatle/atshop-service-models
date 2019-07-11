import { Application, Id, Paginated, Params, Service } from '@feathersjs/feathers';
import { NotFound } from '@feathersjs/errors';
import ModelDocument from '../interfaces/ModelDocument';
import PaginatedServiceModel from './PaginatedServiceModel';
import { App } from '../utility/Service';
import { ModelName } from '../interfaces/Models';

class ServiceModel {

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
     * Dynamic accessor for Feathers application.
     */
    public get _App() {
        // @ts-ignore
        return this.constructor.App;
    }

    /**
     * FeathersVuex Model for the current service.
     */
    public get vuex() {
        // @ts-ignore
       const model = this.constructor.service.FeathersVuexModel;

       if (!model) {
           console.warn('[atshop-service-models] No FeathersVuexModel available for this service.', this.constructor.name)
       }

       return model;
    }

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
    protected hasMany<T extends typeof ServiceModel>(model: ModelName, foreignKey: string, localKey = this.entry._id) {
        const query: Params['query'] = {};
        query[foreignKey] = localKey;

        return new PaginatedServiceModel(this.getModel<T>(model), query);
    }

    /**
     * Registers a relationship between the current model instance and the given ServiceModel instance.
     */
    protected belongsTo<T extends typeof ServiceModel>(modelName: ModelName, foreignKey: AsyncKey) {
        return this.getModel<T>(modelName).get(foreignKey);
    }

    /**
     * Fetch a model by name.
     */
    private getModel<T extends typeof ServiceModel>(modelName: ModelName): T {
        return this._App.get(`atshop-service-models.model.${modelName}`) || require(`../models/${modelName}`).default;
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
    public static find<T extends typeof ServiceModel>(this: T, query: Params) {
        return new PaginatedServiceModel<T>(this, query);
    }

    /**
     * Fetch a single entry from the current service.
     */
    public static async get<T extends typeof ServiceModel>(this: T, id: AsyncKey, query?: Params): Promise<InstanceType<T>> {
        const self = <typeof ServiceModel><unknown>this;
        const result = await self.service.get(await id, query);

        if (!result) {
            throw new NotFound(`The requested entry could not be located!`, {
                id,
                query,
                service: self.servicePath,
            });
        }

        // @ts-ignore
        return new this(result);
    }

    /**
     * Insert an entry into the database.
     */
    public static async create(data: any, params?: Params) {
        return new this(
            // @ts-ignore
            await this.service.create(data, params)
        );
    }
}

interface ServiceModel extends ModelDocument {
    entry: ModelDocument;
}

export type AsyncKey = Id | Promise<Id>;
export default ServiceModel;
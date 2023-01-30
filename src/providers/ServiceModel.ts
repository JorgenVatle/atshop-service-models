import { Application, Id, Paginated, Params, Service } from '@feathersjs/feathers';
import { NotFound } from '@feathersjs/errors';
import ModelDocument from '../interfaces/documents/ModelDocument';
import PaginatedServiceModel from './PaginatedServiceModel';
import { App } from '../utility/Service';
import { ModelName, StaticModel } from '../interfaces/StaticModels';

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
    public static find<Self extends StaticModel<any>>(this: Self, query: Params) {
        return new PaginatedServiceModel(this, query);
    }

    /**
     * Fetch a single entry from the current service.
     */
    public static async get(id: AsyncKey, query?: Params) {
        const result = await this.service.get(await id, query);

        if (!result) {
            throw new NotFound(`The requested entry could not be located!`, {
                id,
                query,
                service: this.servicePath,
            });
        }

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
     * Dynamic accessor for Feathers application.
     */
    public get _App() {
        // @ts-ignore
        return this.constructor.App;
    }

    /**
     * Dynamic accessor for current service.
     */
    public get service() {
        // @ts-ignore
        return this.constructor.service;
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
     * Entry creation date.
     */
    public get createdAt(): Date {
        return new Date(this.entry.createdAt);
    }

    /**
     * Timestamp of entry's last update.
     */
    public get updatedAt(): Date {
        return new Date(this.entry.updatedAt);
    }

    /**
     * Entry soft-deletion timestamp.
     */
    public get deletedAt(): Date | undefined {
        const deletedAt = this.entry.deletedAt;

        if (!deletedAt) {
            return undefined;
        }

        return new Date(deletedAt);
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
     * Remove the current model from the database.
     */
    public remove() {
        return this.service.remove(this._id);
    }

    /**
     * Query the database to re-fetch data for this model.
     */
    public async _renew(data?: ModelDocument) {
        // @ts-ignore
        this._renewEntry(data || await this.constructor.service.get(this._id));
    }

    /**
     * Register has-many relationship for the current model.
     */
    protected hasMany<Name extends ModelName>(model: Name, foreignKey: string, localKey = this.entry._id) {
        const query: Params['query'] = {};
        query[foreignKey] = localKey;

        return new PaginatedServiceModel(this.getModel(model), query);
    }

    /**
     * Register a has-one relationship for the current model.
     */
    protected hasOne<Name extends ModelName>(model: Name, foreignKey: string, localKey: AsyncKey = this._id) {
        const query: Params['query'] = {};
        query[foreignKey] = localKey;

        return new PaginatedServiceModel(this.getModel(model), query).fetchOne();
    }

    /**
     * Registers a relationship between the current model instance and the given ServiceModel instance.
     */
    protected belongsTo<Name extends ModelName>(modelName: Name, foreignKey: AsyncKey) {
        return this.getModel(modelName).get(foreignKey);
    }

    /**
     * Register a belongs-to-many relationship for the current model.
     */
    protected async belongsToMany<Name extends ModelName>(modelName: Name, foreignKeys: AsyncKey[]) {
        const query: Params['query'] = {
            _id: {
                $in: await Promise.all(foreignKeys),
            },
        };

        return new PaginatedServiceModel(this.getModel(modelName), query);
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
     * Fetch a model by name.
     */
    private getModel<Name extends ModelName>(modelName: Name): StaticModel<Name> {
        return this._App.get(`atshop-service-models.model.${modelName}`) || require(`../models/${modelName}`).default;
    }
}

interface ServiceModel extends ModelDocument {
    entry: ModelDocument;
}

export type AsyncKey = Id | Promise<Id>;
export default ServiceModel;
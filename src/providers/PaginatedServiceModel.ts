import { Paginated, Params } from '@feathersjs/feathers';
import ServiceModelStatic, { ModelDocumentType, ModelInstance } from '../interfaces/ServiceModelStatic';
import { NotFound } from '@feathersjs/errors';

export default class PaginatedServiceModel<Model extends ServiceModelStatic> {

    /**
     * Model to be paginated
     */
    private readonly model: Model;

    /**
     * Service query.
     */
    private readonly query: Params['query'];

    /**
     * Cached pagination result.
     */
    private _result: PaginatedModels<Model> = { total: -1, limit: -1,  skip: -1, data: [] };

    /**
     * Paginated model constructor.
     *
     * @param model
     * @param query
     */
    constructor(model: Model, query: Params['query']) {
        this.model = model;
        this.query = query;
    }

    /**
     * Format a raw paginated response into a model"-ified" response.
     *
     * @param result
     */
    private formatResult(result: PaginatedDocuments<Model>): PaginatedModels<Model> {
        return {
            ...result,
            data: result.data.map((document: any) => {
                return new this.model(document) as ModelInstance<Model>;
            }),
        }
    }

    /**
     * Fetch the pagination result.
     */
    public async fetch(query: Params['query'] = {}) {
        if (this._result.total !== -1) {
            return this._result;
        }

        const result = await this.fetchRaw(query);
        this._result = this.formatResult(result);
        return this._result;
    }

    /**
     * Fire a raw FeathersJS fetch request to the current model.
     */
    public async fetchRaw(query: Params['query'] = {}) {
        return await this.model._find({
            ...query,
            ...this.query
        });
    }

    /**
     * Fetch a single entry from the paginated model.
     *
     * @param query
     */
    public async fetchOne(query: Params['query'] = {}) {
        const result = await this.fetch(query);

        if (result.data.length) {
            return result.data[0];
        }

        throw new NotFound('[PaginatedServiceModel] fetchOne() could not locate any entries!', {
            query,
        })
    }

    /**
     * Further dig through the pagination with additional search query.
     *
     * @param query
     */
    public find(query?: Params['query']): PaginatedServiceModel<Model> {
        return new PaginatedServiceModel(this.model, { ...query, ...this.query, });
    }

    /**
     * Patch all matched models.
     */
    public patch(data: any, params?: Params) {
        return this.model._patch(null, data, {
            ...params,
            query: {
                ...(params && params.query),
                ...this.query,
            }
        });
    }

    /**
     * Fetch result count.
     */
    public async count(): Promise<number> {
        const result = await this.fetch({ $limit: 0 });
        return result.total;
    }

    /**
     * Create a new model entry using the current query (likely relationship data) as the document base.
     *
     * @param data
     * @param query
     */
    public create(data: any, query?: Params['query']) {
        return this.model.create({
            ...this.query,
            ...data,
        }, query)
    }

}

type PaginatedDocuments<Model extends ServiceModelStatic> = Paginated<ModelDocumentType<Model>>
type PaginatedModels<Model extends ServiceModelStatic> = Paginated<ModelInstance<Model>>;
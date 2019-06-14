import { Paginated, Params } from '@feathersjs/feathers';
import ServiceModel from './ServiceModel';

export default class PaginatedModel<T> {

    /**
     * Model to be paginated
     */
    private readonly model: typeof ServiceModel;

    /**
     * Service query.
     */
    private readonly query: Params['query'];

    /**
     * Cached pagination result.
     */
    private _result: Paginated<T> = { total: -1, limit: -1,  skip: -1, data: [] };

    /**
     * Paginated model constructor.
     *
     * @param model
     * @param query
     */
    constructor(model: typeof ServiceModel, query: Params['query']) {
        this.model = model;
        this.query = query;
    }

    /**
     * Format a raw paginated response into a model"-ified" response.
     *
     * @param result
     */
    private formatResult(result: Paginated<any>): Paginated<T> {
        return {
            ...result,
            data: result.data.map((document: any) => {
                // @ts-ignore
                return new this.model(document);
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

        const result = await this.model._find({ ...query, ...this.query });

        return this._result = this.formatResult(result)
    }

    /**
     * Fetch a single entry from the paginated model.
     *
     * @param query
     */
    public async fetchOne(query: Params['query'] = {}): Promise<T | null> {
        const result = await this.fetch(query);

        if (result.data.length) {
            return result.data[0];
        }

        return null;
    }

    /**
     * Further dig through the pagination with additional search query.
     *
     * @param query
     */
    public find(query?: Params['query']) {
        return new PaginatedModel<T>(this.model, { ...query, ...this.query, });
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
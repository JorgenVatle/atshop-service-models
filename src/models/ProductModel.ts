import Dinero from 'dinero.js';
import { get } from 'lodash';
import ProductDocument from '../interfaces/ProductDocument';
import ServiceModel from '../providers/ServiceModel';
import ShopModel from './ShopModel';
import ProductStockModel from './ProductStockModel';
import { Omit } from '../utility/TS';
import PaginatedServiceModel from '../providers/PaginatedServiceModel';
import FeedbackSummary from '../interfaces/FeedbackSummary';

class ProductModel extends ServiceModel implements FeedbackSummary {

    /**
     * Service path for Product Model.
     */
    public static readonly servicePath = '/shop/products';

    /**
     * Fetch stock count for the current product.
     */
    public async getStock(): Promise<number> {
        return (await this.stock().fetch({ $limit: 0 })).total;
    }

    /**
     * A product has many stock entries.
     */
    public stock(): PaginatedServiceModel<typeof ProductStockModel> {
        return this.hasMany('ProductStockModel', 'productId', this.entry._id);
    }

    /**
     * Check if the current product has enough stock to create a sale of the given quantity.
     */
    public async hasStockForSale(count: number): Promise<boolean> {
        return (await this.getStock()) >= count;
    }

    /**
     * Dinero instance of product value.
     */
    public get value() {
        return Dinero({ amount: this.entry.value });
    }

    /**
     * Minimum order quantity.
     */
    public get minQuantity() {
        return this.entry.minQuantity;
    }

    /**
     * A product belongs to a shop.
     */
    public get shop(): Promise<ShopModel> {
        return this.belongsTo<typeof ShopModel>('ShopModel', this.entry.shopId);
    }

    /**
     * Stock for sale query object.
     */
    protected get stockForSaleQuery() {
        return { productId: this._id, forSale: true }
    }

    /**
     * Product stock that is for sale.
     */
    public get stockForSale() {
        return this.stock().find(this.stockForSaleQuery);
    }

    /**
     * Product rating in stars.
     * (Float between 0 - 5).
     */
    public get stars() {
        const summary = this.feedbackSummary;

        if (!summary.count) {
            return 'N/A';
        }

        return summary.stars;
    }

    /**
     * Summary of feedback for this product.
     */
    public get feedbackSummary() {
        return {
            count: get(this.entry, 'feedback.count', 0),
            percentage: get(this.entry, 'feedback.score', 0),
            stars: get(this.entry, 'feedback.score', 0) / 20,
        }
    }

}

interface ProductModel extends Omit<ProductDocument, 'value'> {
    entry: ProductDocument;
}

export default ProductModel;
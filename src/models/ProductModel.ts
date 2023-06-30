import Dinero from 'dinero.js';
import { get } from 'lodash';
import EscapeRegex from 'escape-string-regexp';
import ProductDocument from '../interfaces/documents/ProductDocument';
import ServiceModel from '../providers/ServiceModel';
import { Omit } from '../utility/TS';
import FeedbackSummary from '../interfaces/FeedbackSummary';
import { ProductInterface } from '../interfaces/ProductInterface';
import { ModelTimestamps } from '../interfaces/documents/ModelDocument';
import { PaymentGateway } from '../interfaces/documents/GatewayDocument';

class ProductModel extends ServiceModel implements FeedbackSummary, ProductInterface {

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
    public stock() {
        return this.hasMany('ProductStockModel', 'productId', this.entry._id);
    }

    /**
     * Check if the current product has enough stock to create a sale of the given quantity.
     */
    public async hasStockForSale(count: number): Promise<boolean> {
        return (await this.stockForSale.count()) >= count;
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
    public get shop() {
        return this.belongsTo('ShopModel', this.entry.shopId);
    }

    /**
     * A product can belong to a category.
     */
    public get category() {
        return this.belongsTo('CategoryModel', this.entry.category);
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

    /**
     * Whether or not the given payment gateway is acceptable for paying for this product.
     */
    public isPermittedGateway(gateway: PaymentGateway): boolean {
        if (!this.paymentMethods) {
            return true;
        }

        if (!this.paymentMethods.length) {
            return true;
        }

        return this.paymentMethods.indexOf(gateway) !== -1;
    }

    /**
     * Build a search query for a product using the given string.
     */
    static buildSearch(search: string) {
        const regex = {
            $regex: new RegExp(`${EscapeRegex(search)}`, 'i')
        };

        return {
            $or: [
                { _id: regex, },
                { name: regex },
                { description: regex },
                { productIds: regex, },
            ]
        }
    }

}

interface ProductModel extends Omit<ProductDocument, 'value' | 'category' | ModelTimestamps> {
    entry: ProductDocument;
}

export default ProductModel;
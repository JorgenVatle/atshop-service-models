import Dinero from 'dinero.js';
import ProductDocument from '../interfaces/ProductDocument';
import ServiceModel from '../providers/ServiceModel';
import ShopModel from './ShopModel';
import ProductStockModel from './ProductStockModel';
import { Omit } from '../utility/TS';
import PaginatedServiceModel from '../providers/PaginatedServiceModel';

class ProductModel extends ServiceModel {

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
     * Check if the current product has enough stock to create a sale.
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
        const feedback = this.entry.feedback;

        if (!feedback) {
            return 'N/A';
        }

        return feedback.score / 20;
    }

}

interface ProductModel extends Omit<ProductDocument, 'value'> {
    entry: ProductDocument;
}

export default ProductModel;
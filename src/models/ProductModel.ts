import Dinero from 'dinero.js';
import ProductDocument from '../interfaces/ProductDocument';
import ServiceModel from '../providers/ServiceModel';
import ShopModel from './ShopModel';
import ProductStockModel from './ProductStockModel';
import { Omit } from '../utility/TS';

interface ProductModel extends Omit<ProductDocument, 'value'> {
    entry: ProductDocument;
}

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
    public stock() {
        return this.hasMany(ProductStockModel, 'productId', this.entry._id);
    }

    /**
     * Check if the current product has enough stock to create a sale.
     *
     * @param count
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
        return this.belongsTo('ShopModel', this.entry.shopId);
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

}

export default ProductModel;
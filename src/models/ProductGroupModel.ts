import { get } from 'lodash';
import ProductDocument from '../interfaces/ProductDocument';
import { SupplementalRelationalData } from '../utility/SupplementalRelationalData';
import { Omit } from '../utility/TS';
import FeedbackSummary from '../interfaces/FeedbackSummary';
import ServiceModel from '../providers/ServiceModel';
import { ProductInterface } from '../interfaces/ProductInterface';
import ProductGroupDocument from '../interfaces/ProductGroupDocument';
import ProductModel from './ProductModel';
import Dinero from 'dinero.js';
import { CategoryModel } from '../index';
import ShopModel from './ShopModel';
import { ModelTimestamps } from '../interfaces/ModelDocument';

class ProductGroupModel extends ServiceModel implements FeedbackSummary, ProductInterface {

    /**
     * Product groups service path.
     */
    public static readonly servicePath = '/shop/product/groups';

    /**
     * A product group belongs to many products.
     */
    public get products() {
        return this.belongsToMany<typeof ProductModel>('ProductModel', this.productIds);
    }

    /**
     * A product group belongs to a category.
     */
    public get category() {
        return this.belongsTo<typeof CategoryModel>('CategoryModel', this.entry.category);
    }

    /**
     * A product group belongs to a shop.
     */
    public get shop() {
        return this.belongsTo<typeof ShopModel>('ShopModel', this.entry.shopId);
    }

    /**
     * Whether or not this product group has enough stock to create a sale.
     */
    public async hasStockForSale(count: number): Promise<boolean> {
        let enoughStock = false;
        const products = await (await this.products).fetch({ query: { $limit: -1 } });

        products.data.forEach((product: ProductModel) => {
            if (enoughStock) return;
            if (product.hasStockForSale(count)) {
                enoughStock = true;
            }
        });

        return enoughStock;
    }

    /**
     * Summary of feedback for this product group.
     */
    public get feedbackSummary() {
        return {
            count: get(this.entry, 'feedback.count', 0),
            percentage: get(this.entry, 'feedback.score', 0),
            stars: get(this.entry, 'feedback.score') / 20,
        }
    }

    /**
     * Product group value.
     */
    public get value() {
        const products = [...this.entry._belongsToMany['/shop/products']]
            .sort((productA, productB) => productA.value - productB.value);

        if (!products.length) {
            return Dinero({ amount: 0 });
        }

        return Dinero({ amount: products[0].value });
    }

    /**
     * Total stock count for this product group.
     */
    public get stockCount() {
        return this.entry._belongsToMany['/shop/products']
            .reduce((sum, product) => sum + (product.stockCount || 0), 0);
    }

}

interface ProductGroupModel extends Omit<ProductGroupDocument, 'category' | ModelTimestamps> {
    entry: ProductGroupDocument & SupplementalRelationalData<{
        belongsToMany: {
            '/shop/products': ProductDocument,
        }
    }>;
}

export default ProductGroupModel;
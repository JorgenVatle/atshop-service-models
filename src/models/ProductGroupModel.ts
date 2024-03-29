import Dinero from 'dinero.js';
import { get } from 'lodash';
import { ModelTimestamps } from '../interfaces/documents/ModelDocument';
import ProductDocument from '../interfaces/documents/ProductDocument';
import ProductGroupDocument from '../interfaces/documents/ProductGroupDocument';
import FeedbackSummary from '../interfaces/FeedbackSummary';
import { ProductInterface } from '../interfaces/ProductInterface';
import ServiceModel from '../providers/ServiceModel';
import { SupplementalRelationalData } from '../utility/SupplementalRelationalData';
import { Omit } from '../utility/TS';

class ProductGroupModel extends ServiceModel implements FeedbackSummary, ProductInterface {

    /**
     * Product groups service path.
     */
    public static readonly servicePath = '/shop/product/groups';

    /**
     * A product group belongs to many products.
     */
    public get products() {
        return this.belongsToMany('ProductModel', this.productIds);
    }

    /**
     * A product group belongs to a category.
     */
    public get category() {
        return this.belongsTo('CategoryModel', this.entry.category);
    }

    /**
     * A product group belongs to a shop.
     */
    public get shop() {
        return this.belongsTo('ShopModel', this.entry.shopId);
    }

    /**
     * Whether this product group has enough stock to create a sale.
     */
    public hasStockForSale(count: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.products
                .then((products) => products.fetch({ query: { $limit: -1 } }))
                .then(async ({ data: products }) => {
                    for (const product of products) {
                        if (await product.hasStockForSale(count)) {
                            return resolve(true);
                        }
                    }
        
                    return resolve(false);
                })
                .catch(reject)
        })
    }

    /**
     * Summary of feedback for this product group.
     */
    public get feedbackSummary() {
        return {
            count: get(this.entry, 'feedback.count', 0),
            percentage: get(this.entry, 'feedback.score', 0),
            stars: get(this.entry, 'feedback.score', 0) / 20,
        }
    }

    /**
     * Product group value.
     */
    public get value() {
        const products = [...this.entry._belongsToMany['/shop/products']]
            .sort((productA, productB) => productA.value - productB.value);

        if (!products.length || !products[0]) {
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
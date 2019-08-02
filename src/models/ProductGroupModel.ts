import { get } from 'lodash';
import FeedbackSummary from '../interfaces/FeedbackSummary';
import ServiceModel from '../providers/ServiceModel';
import { ProductInterface } from '../interfaces/ProductInterface';
import ProductGroupDocument from '../interfaces/ProductGroupDocument';
import ProductModel from './ProductModel';

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

}

interface ProductGroupModel extends ProductGroupDocument {
    entry: ProductGroupDocument;
}

export default ProductGroupModel;
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

}

interface ProductGroupModel extends ProductGroupDocument {
    entry: ProductGroupDocument;
}

export default ProductGroupModel;
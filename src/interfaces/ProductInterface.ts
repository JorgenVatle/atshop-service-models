import { ProductStyle } from './ProductDocument';
import ModelDocument from './ModelDocument';

export default interface ProductInterface extends ModelDocument {

    /**
     * ID of the shop this product belongs to.
     */
    shopId: string;

    /**
     * Product name.
     */
    name: string;

    /**
     * Product description.
     */
    description: string;

    /**
     * Product display style.
     */
    style: ProductStyle,

    /**
     * Product image URL.
     */
    image_url?: string;

    /**
     * Product fallback icon.
     */
    icon?: string;

    /**
     * Whether or not to display the product description on the product card.
     */
    displayDescription: boolean;

    /**
     * Category ID this product belongs to.
     */
    category?: string;

    /**
     * Display priority of this product.
     * From low to high.
     */
    priority?: number;

    /**
     * Remaining stock for sale for the product.
     */
    stockCount: number;

    /**
     * Whether or not the product has enough stock to create a sale of the given number of products.
     */
    hasStockForSale(count: number): Promise<boolean>;

    /**
     * Product implementation type.
     */
    type?: 'group' | 'product';
}
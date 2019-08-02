import ModelDocument from './ModelDocument';

export type ProductStyle = 'box' | 'dynamic' | 'card';

export default interface ProductDocumentInterface extends ModelDocument {

    /**
     * ID of the shop this product belongs to.
     */
    shopId: string;

    /**
     * Title of the product.
     */
    name: string;

    /**
     * Markdown description of the current product.
     */
    description: string;

    /**
     * Product info layout.
     * Merchants can pick from a set of predefined product "styles" that determine how the product should look and
     * behave in the merchant shop.
     */
    style: ProductStyle,

    /**
     * Product image URL.
     */
    image_url?: string;

    /**
     * Icon to use as a fallback if no product image is provided.
     */
    icon?: string;

    /**
     * Whether or not we should display this product's markdown description on the product card itself instead of in
     * a dialog that pops up when the customer clicks on the product.
     */
    displayDescription: boolean;

    /**
     * ID of the category that this product belongs to.
     */
    category: string;

    /**
     * Position of this product relative to other products.
     * From low to high.
     */
    priority?: number;

    /**
     * Number of stock entries that are left for sale for this product.
     */
    stockCount: number;

    /**
     * Product implementation type.
     */
    type?: 'group' | 'product';

    /**
     * Feedback summary for this product.
     */
    feedback?: {
        /**
         * Number of ratings provided by customers.
         */
        count: number;

        /**
         * Score for this product.
         * (0 - 100)
         */
        score: number;
    }

}
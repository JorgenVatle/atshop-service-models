import ModelDocument from './ModelDocument';

export type ProductStyle = 'box' | 'dynamic' | 'card';

export type RequireShipping = 'no' | 'ask' | 'require';

export default interface ProductDocument extends ModelDocument {
    /**
     * Title of the product.
     */
    name: string;

    /**
     * Markdown description of the current product.
     */
    description: string;

    /**
     * Markdown to be displayed to customers who've purchased this product.
     */
    purchaseNotes: string;

    /**
     * Icon to use as a fallback if no product image is provided.
     */
    icon: string;

    /**
     * URL to product image.
     */
    image_url?: string;

    /**
     * Minimum order quantity.
     */
    minQuantity: number;

    /**
     * Product info layout.
     * Merchants can pick from a set of predefined product "styles" that determine how the product should look and
     * behave in the merchant shop.
     */
    style: ProductStyle;

    /**
     * Whether or not we should require shipping information from the customer during the checkout process.
     * This is only applied to payment gateways that support it. We (ATShop.io) do not collect this information.
     */
    requireShipping: RequireShipping;

    /**
     * Whether or not we should discard duplicated stock entries for this product.
     *
     * E.g. if the merchant attempts to add `abc-123` to this product's stock twice, we'll simply discard that entry
     * to ensure that stock for this product is unique at all times. Previously sold stock entries for this product
     * will also be checked. Other products' stock will not be checked, so you'll still have the ability to have the
     * same stock entry for two different products with this option enabled.
     */
    preventDuplicates: boolean;

    /**
     * Product value in cents.
     * E.g. 150 = $1.50 USD.
     */
    value: number;

    /**
     * Whether or not we should display this product's markdown description on the product card itself instead of in
     * a dialog that pops up when the customer clicks on the product.
     */
    displayDescription: boolean;

    /**
     * ID of the shop that this product belongs to.
     */
    shopId: string;

    /**
     * Number of stock entries that are left for sale for this product.
     */
    stockCount: number;

    /**
     * Overall stock entries for this product.
     */
    totalStockCount: number;

    /**
     * Position of this product relative to other products.
     */
    priority: number;

    /**
     * ID of the category that this product belongs to.
     */
    category: string;

    /**
     * Whether or not we should use the order ID instead of the product name in the gateway checkout process.
     * E.g. Instead of displaying "5x Random Steam Keys" in PayPal, we'll just display "Payment for Order #abc123"
     */
    useOrderIdAsItemName: boolean;

    /**
     * Soft-deletion date of this product.
     */
    deletedAt?: Date;

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
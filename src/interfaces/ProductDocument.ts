import ProductInterface from './ProductInterface';

export type RequireShipping = 'no' | 'ask' | 'require';

export default interface ProductDocument extends ProductInterface {

    /**
     * Markdown to be displayed to customers who've purchased this product.
     */
    purchaseNotes: string;

    /**
     * Minimum order quantity.
     */
    minQuantity: number;

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
     * Overall stock entries for this product.
     */
    totalStockCount: number;

    /**
     * Whether or not we should use the order ID instead of the product name in the gateway checkout process.
     * E.g. Instead of displaying "5x Random Steam Keys" in PayPal, we'll just display "Payment for Order #abc123"
     */
    useOrderIdAsItemName: boolean;

    /**
     * Soft-deletion date of this product.
     */
    deletedAt?: Date;

}
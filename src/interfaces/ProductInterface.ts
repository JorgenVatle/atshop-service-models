export default interface ProductInterface {

    /**
     * Product name.
     */
    name: string;

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
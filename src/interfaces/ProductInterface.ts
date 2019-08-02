export default interface ProductInterface {

    /**
     * Remaining stock for sale for the product.
     */
    stockCount: number;

    /**
     * Whether or not the product has enough stock to create a sale of the given number of products.
     */
    hasStockForSale(count: number): Promise<boolean>;

}
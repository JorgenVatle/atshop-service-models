export interface ProductInterface {

    /**
     * Whether or not the product has enough stock to create a sale of the given number of products.
     */
    hasStockForSale(count: number): Promise<boolean>;

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
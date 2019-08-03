import { Dinero } from 'dinero.js';

export interface ProductInterface {

    /**
     * Whether or not the product has enough stock to create a sale of the given number of products.
     */
    hasStockForSale(count: number): Promise<boolean>;

    /**
     * Number of stock entries that are left for sale for this product.
     */
    stockCount: number;

    /**
     * Product value instanced as a Dinero object.
     */
    value: Dinero,

}
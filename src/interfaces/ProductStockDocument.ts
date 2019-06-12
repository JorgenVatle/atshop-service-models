import ModelDocument from './ModelDocument';

export default interface ProductStockDocument extends ModelDocument {

    /**
     * String that is given to the customer on payment completion.
     */
    entry: string;

    /**
     * ID of the product this stock entry belongs to.
     */
    productId: string;

    /**
     * ID of the order this stock entry belongs to. (If sold!)
     */
    orderId?: string;

    /**
     * Whether or not the current stock entry has been sold.
     */
    sold: boolean;

    /**
     * Whether or not the current stock entry is up for sale.
     */
    forSale: boolean;

}
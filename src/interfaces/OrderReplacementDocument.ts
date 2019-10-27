import ModelDocument from './ModelDocument';

export default interface OrderReplacementDocument extends ModelDocument {
    /**
     * User that issued the replacement.
     * (Only visible to shop administrators)
     */
    userId: string;

    /**
     * Order this replacement is issued for.
     */
    orderId: string;

    /**
     * Number of stock entries to send to the customer.
     */
    quantity: number;

    /**
     * Replacement note provided by the administrator that issued the replacement.
     * (Only visible to shop administrators)
     */
    message: string;
}
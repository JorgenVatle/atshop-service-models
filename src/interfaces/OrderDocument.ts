import ModelDocument from './ModelDocument';
import { CurrencyCode } from '../utility/AvailableCurrencies';

export default interface OrderDocument extends ModelDocument {
    /**
     * ID of the product that was ordered.
     */
    productId: string;

    /**
     * Number of product ordered.
     */
    quantity: number;

    /**
     * Email address of the customer who placed this order.
     */
    email: string;

    /**
     * ID of the shop this order belongs to.
     */
    shopId: string;

    /**
     * Whether or not this order has been paid for.
     */
    paid: boolean;

    /**
     * Date of payment for this order.
     */
    paidAt: Date;

    /**
     * Secret key stored in the customer's browser to protect ordered items from search engines.
     */
    secret: string;

    /**
     * Status of the current order.
     * Todo: define available status types.
     */
    status: string;

    /**
     * ID of the IPN notification that triggered order fulfillment.
     */
    ipnId: string;

    /**
     * Currency this order should be paid in.
     */
    currency: CurrencyCode;

    /**
     * Admin-provided reason for discarding the current order.
     * (If flagged for manual fraud review)
     */
    discardReason: string;

    /**
     * Whether or not the current order has been fulfilled.
     */
    fulfilled: boolean,
}
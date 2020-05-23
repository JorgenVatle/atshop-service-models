import ModelDocument from './ModelDocument';
import { CurrencyCode } from '../utility/AvailableCurrencies';
import { PaymentGateway } from './GatewayDocument';

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
     * Order value with discounts.
     */
    toPay: number;

    /**
     * Whether or not this order has been paid for.
     */
    paid: boolean;

    /**
     * Date of payment for this order.
     */
    paidAt?: Date;

    /**
     * Secret key stored in the customer's browser to protect ordered items from search engines.
     */
    secret: string;

    /**
     * Payment status of the current order.
     */
    status?: 'reversed' // The customer triggered a chargeback for this order, reverting funds back to the customer.
        | 'completed'   // Order was paid for and fulfilled.
        | 'discarded'   // Order was discarded by the shop administrator.
        | 'hold';       // Pending manual review by the shop administrator.

    /**
     * ID of the IPN notification that triggered order fulfillment.
     */
    ipnId?: string;

    /**
     * Currency this order should be paid in.
     */
    currency: CurrencyCode;

    /**
     * Admin-provided reason for discarding the current order.
     * (If flagged for manual fraud review)
     */
    discardReason?: string;

    /**
     * Whether or not the current order has been fulfilled.
     */
    fulfilled: boolean,

    /**
     * Tracked analytics event for the current order.
     */
    analytics?: {
        /**
         * Whether or not we've tracked the purchase event for this order.
         */
        purchase?: boolean;
    },

    /**
     * Payment method used to pay for this order.
     */
    paymentMethod?: PaymentGateway;
}
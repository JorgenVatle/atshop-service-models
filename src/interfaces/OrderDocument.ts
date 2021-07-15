import ModelDocument from './ModelDocument';
import { CurrencyCode } from '../utility/AvailableCurrencies';
import { PaymentGateway } from './GatewayDocument';
import { OrderLinkType } from '../providers/OrderURL';

export interface EmailStatus {
    sent: boolean;
    attempts: number;
    exception?: string;
}

export type PaymentRedirectOverrides = {
    [key in OrderLinkType]: string | null;
}

export interface OrderEmailStatuses {
    /**
     * Purchase Confirmation Email Status
     */
    purchaseConfirmation: EmailStatus;
}

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
     * Sum in cents that was transmitted as payment for this order.
     */
    paidAmount?: number;

    /**
     * Secret key stored in the customer's browser to protect ordered items from search engines.
     */
    secret: string;

    /**
     * Redirect targets for payments
     */
    paymentRedirects?: Partial<PaymentRedirectOverrides>;

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

    /**
     * ID of coupon code used with this order.
     */
    couponId?: string;

    /**
     * Transactional email statuses for this order.
     */
    emails?: OrderEmailStatuses;
}

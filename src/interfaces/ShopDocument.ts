import ModelDocument from './ModelDocument';
import { CurrencyCode } from '../utility/AvailableCurrencies';

export default interface ShopDocument extends ModelDocument {
    /**
     * Name of the current shop.
     */
    name: string;

    /**
     * Currency for the current shop.
     */
    currency: CurrencyCode;

    /**
     * Subdomain for the current shop.
     * E.g. test-shop.
     */
    domain: string;

    /**
     * Full custom, merchant provided domain for the current shop.
     */
    customDomain?: string,

    /**
     * Tagline for the current shop.
     */
    tagline: string;

    /**
     * Company name for the current shop.
     */
    companyName: string;

    /**
     * Company information for the current shop.
     * This is intended to be appended to invoices sent to customers once such functionality is in place.
     */
    companyInfo: string;

    /**
     * List of user IDs that have administrative privileges over the current shop.
     */
    admins: Array<string>;

    /**
     * ID of the user that created this shop.
     */
    createdBy: string;

    /**
     * Webhook URLs to hit for shop events.
     */
    webhooks?: {
        /**
         * Discord webhook URL.
         */
        discord?: string;
    };

    /**
     * Number of products attached to this shop.
     */
    productCount: number;

    /**
     * Revenue of this shop for the past 30 days in cents.
     */
    monthRevenue: number;

    /**
     * Overall revenue for this shop.
     */
    totalRevenue: number;

    /**
     * Style options.
     */
    style: {
        /**
         * Merchant provided URI of the current shop's logo.
         */
        logoUri?: string,

        /**
         * URI to background image for this shop.
         */
        backgroundImage?: string;
    };

    /**
     * Optional override for the maximum number of products to be attached to this shop.
     */
    productLimit?: number;

    /**
     * ID of the user that soft-deleted the current shop.
     */
    deletedBy?: string;

    /**
     * Fraud risk percentage threshold for the current shop.
     */
    maxFraud: number;

    /**
     * Shop feedback.
     */
    feedback?: {
        /**
         * Number of reviews left across all products belonging to this shop.
         */
        count: number;

        /**
         * A score from 0 - 100 determining the percentage of positive reviews.
         */
        score: number;
    }
}
import { CurrencyCode } from '../../utility/AvailableCurrencies';
import ModelDocument from './ModelDocument';

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
     * Social media, tracking and support widgets.
     */
    widgets: {
        /**
         * Discord invite link
         */
        discord: string;    // e.g. https://discord.gg/abc123

        /**
         * Telegram link
         */
        telegram: string;   // e.g. https://t.me/abc123

        /**
         * Twitter username
         */
        twitter: string;    // e.g. ATShopIo

        /**
         * Crisp website ID
         */
        crisp: string;      // e.g. 8d49a682-7cf0-4ae8-a2d9-18791dfb35e2

        /**
         * Google Analytics tracking ID
         */
        analytics: string;  // e.g. UA-12345678-1
    },

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
         * (any size, serves as a replacement for the shop name in the navbar)
         */
        logoUri?: string,

        /**
         * Merchant provided URI of the shop's logo icon.
         * (64x64)
         */
        logoIconUri?: string;

        /**
         * URI to background image for this shop.
         */
        backgroundImage?: string;
    };

    /**
     * Whether or not the merchant forces all customers to use the shop's custom domain.
     */
    enforceCustomDomain: boolean;

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
    },

    /**
     * Category to be highlighted on the product landing page.
     */
    featured?: {
        title: string;
        icon: string;
        categoryId: string;
    };
}
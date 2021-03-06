import { get } from 'lodash';
import ShopDocument from '../interfaces/ShopDocument';
import ProductModel from './ProductModel';
import ServiceModel from '../providers/ServiceModel';
import CustomerBlacklistModel from './CustomerBlacklistModel';
import GatewayModel from './GatewayModel';
import CategoryModel from './CategoryModel';
import Helpers from '../utility/Helpers';
import PaginatedServiceModel from '../providers/PaginatedServiceModel';
import FeedbackSummary from '../interfaces/FeedbackSummary';
import { ModelTimestamps } from '../interfaces/ModelDocument';

class ShopModel extends ServiceModel implements FeedbackSummary {

    /**
     * Service path for the "shops" service.
     */
    public static servicePath = '/shops';

    /**
     * A shop has many blacklisted customers.
     */
    public get blacklist(): PaginatedServiceModel<typeof CustomerBlacklistModel> {
        return this.hasMany('CustomerBlacklistModel', 'shopId', this.entry._id);
    }

    /**
     * A shop has many gateways.
     */
    public get gateways(): PaginatedServiceModel<typeof GatewayModel> {
        return this.hasMany('GatewayModel', 'shopId', this.entry._id);
    }

    /**
     * A shop can have many products.
     */
    public get products(): PaginatedServiceModel<typeof ProductModel> {
        return this.hasMany('ProductModel', 'shopId', this.entry._id);
    }

    /**
     * A shop can have many categories.
     */
    public get categories(): PaginatedServiceModel<typeof CategoryModel> {
        return this.hasMany('CategoryModel', 'shopId', this.entry._id);
    }

    /**
     * Check if the given email is blacklisted from the current shop.
     *
     * @param email
     */
    public async isBlacklisted(email: string) {
        const results = await this.blacklist.find({ email }).fetch();

        return results.total > 0;
    }

    /**
     * Whether or not this shop has an available Discord webhook.
     */
    public get hasDiscord(): boolean {
        return !!(this.webhooks && this.webhooks.discord);
    }

    /**
     * Max permitted fraud percentage for this shop.
     */
    public get maxFraud() {
        return this.entry.maxFraud || 30;
    }

    /**
     * Build a full-fledged URL to a page on the given path for the current shop.
     */
    public urlTo(path: string, legacy?: boolean) {
        let frontend = this._App.get('frontend');

        if (legacy) {
            frontend = this._App.get('legacyFrontend') || frontend;
        }

        let host = `${this.domain}.${frontend.host}`;

        if (this.entry.customDomain && this.enforceCustomDomain) {
            host = this.entry.customDomain;
        }

        return Helpers.urlTo(frontend.protocol, host, path);
    }

    /**
     * Build a URL to the admin dashboard.
     */
    public adminUrl(path: string) {
        return this.urlTo('/admin/' + path.replace(/^\/+/, ''), true);
    }

    /**
     * Legal name of the current shop.
     */
    public get legalName() {
        return this.companyName || this.name;
    }

    /**
     * Summary of feedback for this product.
     */
    public get feedbackSummary() {
        return {
            count: get(this.entry, 'feedback.count', 0),
            percentage: get(this.entry, 'feedback.score', 0),
            stars: get(this.entry, 'feedback.score', 0) / 20,
        }
    }
}

interface ShopModel extends Omit<ShopDocument, ModelTimestamps> {
    entry: ShopDocument;
}

export default ShopModel;
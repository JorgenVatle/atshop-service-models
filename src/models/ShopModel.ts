import ShopDocument from '../interfaces/ShopDocument';
import ProductModel from './ProductModel';
import ServiceModel from '../providers/ServiceModel';

interface ShopModel extends ShopDocument {
    entry: ShopDocument;
}

class ShopModel extends ServiceModel {

    /**
     * Service path for the "shops" service.
     */
    protected static readonly collectionName = 'shops';

    /**
     * Publicly visible fields.
     */
    public static readonly publicFields = [
        '_id', 'name', 'style', 'domain', 'tagline', 'widgets', 'currency', 'companyName', 'customDomain',
        'feedback.count', 'feedback.score', 'disabled'
    ];

    /**
     * A shop has many blacklisted customers.
     */
    public get blacklist() {
        return this.hasMany(CustomerBlacklistModel, 'shopId', this.entry._id);
    }

    /**
     * A shop has many gateways.
     */
    public get gateways() {
        return this.hasMany(GatewayModel, 'shopId', this.entry._id);
    }

    /**
     * A shop can have many products.
     */
    public get products() {
        return this.hasMany(ProductModel, 'shopId', this.entry._id);
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
     * Build a full-fledged URL to a page on the given path for the current shop.
     */
    public urlTo(path: string) {
        const frontend = this._App.get('frontend');
        return Helpers.urlTo(frontend.protocol, `${this.domain}.${frontend.host}`, path);
    }

    /**
     * Discord notification instance for the current shop.
     */
    public get discord(): DiscordNotification {
        return new DiscordNotification(this);
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
}
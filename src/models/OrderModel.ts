import Gravatar from 'gravatar';
import ServiceModel from '../providers/ServiceModel';
import OrderDocument from '../interfaces/OrderDocument';
import { CurrencyCode } from '../utility/AvailableCurrencies';
import ShopModel from './ShopModel';
import Dinero from 'dinero.js';
import ProductStockModel from './ProductStockModel';
import ProductModel from './ProductModel';
import IpnModel from './IpnModel';

interface OrderModel extends Omit<OrderDocument, 'currency'> {
    entry: OrderDocument;
}

class OrderModel extends ServiceModel {

    /**
     * Order Model service path.
     */
    public static readonly servicePath = '/shop/orders';

    /**
     * Whether or not the given secret allows the user to view stock content/data.
     *
     * @param secret
     */
    public canViewStockData(secret?: string) {
        if (!this.entry.secret) {
            return true;
        }

        return secret === this.entry.secret;
    }

    /**
     * An order has many ordered items.
     */
    public get items() {
        return this.hasMany(ProductStockModel, 'orderId');
    }

    /**
     * An order belongs to a shop.
     */
    public get shop(): Promise<ShopModel> {
        return this.belongsTo(ShopModel, this.shopId);
    }

    /**
     * An order belongs to a product.
     */
    public get product() {
        return <Promise<ProductModel>>this.belongsTo(ProductModel, this.productId);
    }

    /**
     * An order belongs to an IPN.
     */
    public get ipn(): Promise<IpnModel> {
        return this.belongsTo(IpnModel, this.ipnId);
    }

    /**
     * Order value in cents.
     */
    public async value() {
        const product = await this.product;

        return Dinero({
            ...product.value.toObject(),
            currency: await this.currency,
        }).multiply(this.quantity);
    }

    /**
     * Currency of order.
     */
    public get currency(): Promise<CurrencyCode> {
        return this.shop.then((shop: ShopModel) => {
            return shop.currency || 'USD';
        });
    }

    /**
     * Customer identifier.
     */
    public get customerId() {
        // For the time being, we'll just use the order ID.
        return this._id;
    }

    /**
     * Direct the user to this URI when the payment process is completed.
     */
    public get redirectOnCompleted() {
        return this.customerLink('waiting');
    }

    /**
     * Redirect the user to this URI when the payment process is cancelled.
     */
    public get redirectOnCancelled() {
        return this.customerLink('cancelled');
    }

    /**
     * Order product name.
     */
    public get name() {
        return this.product.then((product) => product.name);
    }

    /**
     * Order description.
     */
    public get description() {
        return `Payment for order #${this._id}`;
    }

    /**
     * Full order value, in human readable decimal.
     */
    public async humanValue() {
        return (await this.value()).toFormat();
    }

    /**
     * Prepare a payment for the user, returning an object with enough information to build up an order
     * on the client side.
     */
    public async preparePayment() {
        // Todo: Add browser-compatible implementation.
        // @link https://github.com/JorgenVatle/atshop-api/blob/master/src/models/OrderModel.ts#L187
    }

    /**
     * Fetch the payment method used to complete this order.
     */
    public async paymentMethod() {
        if (!this.ipnId) {
            return 'N/A';
        }

        return (await this.ipn).humanGatewayName;
    }

    /**
     * Whether or not the order has been fulfilled.
     */
    public get isFulfilled() {
        return this.entry.fulfilled;
    }

    /**
     * Gravatar image URL for the customer.
     */
    public get customerAvatar() {
        return Gravatar.url(this.email, {
            size: '300',
            protocol: 'https',
            default: 'identicon',
            rating: 'x',
        });
    }

    /**
     * Whether or not the given secret is valid for the current order.
     */
    public isValidSecret(secret: string) {
        return this.secret === secret;
    }

    /**
     * Amount of stock currently assigned to this order.
     */
    public stockAssignedCount(): Promise<number> {
        return this.items.count();
    }

    /**
     * Amount of stock that needs to be assigned to this order on fulfill().
     */
    public async missingStockCount() {
        return this.quantity - await this.stockAssignedCount();
    }

    /**
     * Whether or not the ordered product has enough stock to be fulfilled.
     */
    public async hasEnoughStock() {
        const missingStock = this.missingStockCount();
        const product = await this.product;
        return (await missingStock) <= (await product.stockForSale.count())
    }

    /**
     * Link to view this order as a customer.
     */
    public async customerLink(state?: 'waiting' | 'cancelled') {
        // Todo: push state onto URL.
        const shop = await this.shop;
        return shop.urlTo('/orders/' + this._id);
    }

    /**
     * Link to view this order as an administrator.
     */
    public async adminLink() {
        const shop = await this.shop;
        return shop.urlTo('/admin/orders/' + this._id);
    }

}
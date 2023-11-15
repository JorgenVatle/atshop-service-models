import { NotFound, Unprocessable } from '@feathersjs/errors';
import Dinero from 'dinero.js';
import Gravatar from 'gravatar';
import { GatewayModel } from '../index';
import { ModelTimestamps } from '../interfaces/documents/ModelDocument';
import OrderDocument from '../interfaces/documents/OrderDocument';
import OrderURL from '../providers/OrderURL';
import ServiceModel from '../providers/ServiceModel';
import { CurrencyCode } from '../utility/AvailableCurrencies';
import { Omit } from '../utility/TS';

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
        return this.hasMany('ProductStockModel', 'orderId');
    }

    /**
     * An order belongs to a shop.
     */
    public get shop() {
        return this.belongsTo('ShopModel', this.shopId);
    }

    /**
     * An order belongs to a product.
     */
    public get product() {
        return this.belongsTo('ProductModel', this.productId);
    }

    /**
     * An order can have feedback.
     */
    public get feedback() {
        return this.hasOne('OrderFeedbackModel', 'orderId')
    }

    /**
     * An order belongs to an IPN.
     */
    public get ipn() {
        if (!this.ipnId) {
            throw new Unprocessable(`Order #${this._id} does not yet have an attached IPN.`);
        }
        return this.belongsTo('IpnModel', this.ipnId);
    }

    /**
     * Whether or not this order was created in ATShop v1.
     */
    public get isLegacy() {
        return typeof this.entry.__v === 'undefined';
    }

    /**
     * Original order value without any discounts.
     */
    public async originalValue() {
        const product = await this.product;

        return Dinero({
            ...product.value.toObject(),
            currency: await this.currency,
        }).multiply(this.quantity);
    }

    /**
     * Order value as a Dinero object. This includes any applicable discounts.
     */
    public async value(gateway: Promise<GatewayModel<any> | null> | GatewayModel<any> = this.paymentGateway()) {
        const paymentGateway = await gateway;
        let value = await this.originalValue();

        if (this.entry.toPay) {
            value = Dinero({
                amount: this.entry.toPay,
                currency: await this.currency,
            });
        }

        if (paymentGateway && paymentGateway.multiplier) {
            value = value.multiply(paymentGateway.multiplier);
        }

        return value;
    }

    /**
     * Amount of funds transmitted as payment for this order as a Dinero object.
     */
    public async paidAmount() {
        return Dinero({
            amount: this.entry.paidAmount || 0,
            currency: await this.currency,
        })
    }

    /**
     * Currency of order.
     */
    public get currency(): Promise<CurrencyCode> {
        return this.shop.then((shop) => {
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
     * Order product name.
     */
    public get name() {
        return this.product.then((product) => {
            if (product.useOrderIdAsItemName) {
                return `Order: ${this._id}`
            }

            return product.name;
        });
    }

    /**
     * Order description.
     */
    public get description() {
        return `Payment for order #${this._id}`;
    }

    /**
     * Product ID passed to payment gateway.
     */
    public get gatewayProductId() {
        return this.product.then((product) => {
            if (product.useOrderIdAsItemName) {
                return undefined;
            }

            return product._id;
        });
    }

    /**
     * Full order value, in human readable decimal.
     */
    public async humanValue() {
        return (await this.value()).toFormat();
    }

    /**
     * Fetch the payment method used to complete this order.
     */
    public async paymentMethod() {
        const gateway = this.entry.paymentMethod;

        if (!gateway && this.ipnId) {
            return (await this.ipn).humanName;
        }

        return GatewayModel.humanizeName(gateway);
    }

    /**
     * Whether or not the order has been fulfilled.
     */
    public get isFulfilled(): boolean {
        return this.entry.fulfilled || false;
    }

    /**
     * Whether or not the current order has feedback attached.
     */
    public get hasFeedback(): Promise<boolean> {
        return this.feedback.then(() => true).catch((exception) => {
            if (exception instanceof NotFound !== true) {
                throw exception;
            }

            return false;
        });
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
     * Order-specific links for different stages in the checkout process.
     * These links are intended to be permanent and safe, even in instances where a merchant changes their shop URL.
     */
    public get url() {
        return new OrderURL(this);
    }

    /**
     * Link to view this order as an administrator.
     */
    public async adminLink() {
        const shop = await this.shop;
        return shop.adminUrl('/orders/' + this._id);
    }

    /**
     * An order may have a coupon code.
     */
    public coupon() {
        if (!this.couponId) {
            return null;
        }
        return this.belongsTo('CouponModel', this.couponId);
    }

    /**
     * The payment gateway used to pay for this order.
     */
    public async paymentGateway() {
        const gatewayName = await this.entry.paymentMethod;

        if (!gatewayName) {
            return null;
        }

        return (await this.shop).gateways.fetchOne({ name: gatewayName }).catch(() => null);
    }

}

interface OrderModel extends Omit<OrderDocument, 'currency' | 'paymentMethod' | 'paidAmount' | ModelTimestamps> {
    entry: OrderDocument;
}

export default OrderModel;
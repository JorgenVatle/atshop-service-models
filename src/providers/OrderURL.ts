import OrderModel from '../models/OrderModel';
import { KeyValue } from '../utility/TS';
import { HostConfig } from '../utility/Service';
import Helpers from '../utility/Helpers';

export type OrderLinkType =
    'waiting' | // Gateway payment process completed - waiting for payment to be confirmed.
    'cancelled' | // Customer cancelled the gateway's checkout process. (prompts customer to select another payment method)
    'completed'; // The payment process was completed and ATShop has verified the payment. Skips the 'waiting' state. Try to avoid using this for anything other than confirmation emails.

interface LinkOptions {
    type: OrderLinkType;
    secret?: string;
}

interface PermalinkServiceParams {
    orderId: string;
    type: OrderLinkType;
    secret?: string;
}

export default class OrderURL {

    /**
     * Current Order
     * @protected
     */
    protected readonly order: OrderModel;

    /**
     * Permalink service configuration
     * @protected
     */
    protected readonly permalinkConfig: HostConfig

    /**
     * Order Link constructor.
     * @param order
     */
    public constructor(order: OrderModel) {
        this.order = order;
        this.permalinkConfig = order._App.get('permalinkService');
    }

    /**
     * Create a safe permanent link for the current order.
     * This works around issues that may occur if a merchant changes their domain while a customer is checking out.
     * @param type
     * @param secret
     * @protected
     */
    protected createLink({ type, secret }: LinkOptions) {
        const query: PermalinkServiceParams = {
            orderId: this.order._id,
            type,
            secret,
        };

        return Helpers.urlTo(
            this.permalinkConfig.protocol,
            this.permalinkConfig.host,
            '/shop/order/return',
            <KeyValue>query,
        )
    }

    /**
     * Redirect the customer to this URL after they have completed the checkout process with any gateway.
     */
    public get checkoutCompleted() {
        return this.createLink({
            type: 'waiting',
            secret: this.order.secret,
        });
    }

    /**
     * Redirect the customer to this URL after they have cancelled the checkout process with any gateway.
     */
    public get checkoutCancelled() {
        return this.createLink({
            type: 'cancelled',
        });
    }

    /**
     * Link emailed to the customer after their order has been completed and fulfilled.
     */
    public get confirmationEmail() {
        return this.createLink({
            type: 'completed',
            secret: this.order.secret,
        })
    }


}
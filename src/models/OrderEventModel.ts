import ServiceModel from '../providers/ServiceModel';
import OrderEventDocument, { OrderEventLabel, OrderEventName } from '../interfaces/documents/OrderEventDocument';
import { ModelTimestamps } from '../interfaces/documents/ModelDocument';

class OrderEventModel extends ServiceModel {

    /**
     * Order event service path.
     */
    public static readonly servicePath = '/shop/order/events';

    /**
     * Notifiable events.
     */
    protected readonly notifiable: OrderEventName[] = [
        'order_on_hold',
        'order_fulfilled',
        'order_manually_approved',
        'order_status_reversed',
        'order_status_discarded'
    ];

    /**
     * Events that can trigger a notification to the customer.
     */
    protected readonly customerNotifiable: OrderEventName[] = [
        'order_fulfilled',
    ];

    /**
     * Event base metadata.
     */
    public readonly baseData: { [key: string]: OrderEventLabel } = {
        order_fulfilled: {
            title: 'Order Paid',
            level: 'success',
        },
        order_on_hold: {
            title: 'Order on Hold',
            level: 'warning',
        },
        order_manually_approved: {
            title: 'Order Approved',
            level: 'success',
        },
        order_status_discarded: {
            title: 'Order Discarded',
            level: 'warning',
        },
        order_status_reversed: {
            title: 'Order Reversed',
            level: 'danger',
        },
    };

    /**
     * An order event belongs to an order.
     */
    public get order() {
        return this.belongsTo('OrderModel', this.orderId);
    }

    /**
     * An order event belongs to a shop.
     */
    public get shop() {
        const shopId = this.order
            .then((order) => order.shop)
            .then((shop) => shop._id);
        return this.belongsTo('ShopModel', shopId);
    }

    /**
     * Whether or not this event is notifiable.
     */
    protected get isNotifiable() {
        return this.notifiable.indexOf(this.name) !== -1
    }

    /**
     * Whether or not the customer can be notified of the current event.
     */
    protected get isCustomerNotifiable(): boolean {
        return this.customerNotifiable.indexOf(this.name) !== -1;
    }

}

interface OrderEventModel extends Omit<OrderEventDocument, ModelTimestamps> {
    entry: OrderEventDocument;
}

export default OrderEventModel;
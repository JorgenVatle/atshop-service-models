import ServiceModel from '../providers/ServiceModel';
import OrderFeedbackDocument from '../interfaces/documents/OrderFeedbackDocument';
import { ModelTimestamps } from '../interfaces/documents/ModelDocument';

class OrderReplacementModel extends ServiceModel {

    /**
     * Service path for order replacements.
     */
    public static readonly servicePath = '/shop/order/replacements';

    /**
     * A replacement belongs to an order.
     */
    public get order() {
        return this.belongsTo('OrderModel', this.orderId);
    }

}

interface OrderReplacementModel extends Omit<OrderFeedbackDocument, ModelTimestamps> {
    entry: OrderFeedbackDocument;
}

export default OrderReplacementModel;
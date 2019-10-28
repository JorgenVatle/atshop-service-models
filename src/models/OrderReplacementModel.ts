import ServiceModel from '../providers/ServiceModel';
import OrderFeedbackDocument from '../interfaces/OrderFeedbackDocument';
import OrderModel from './OrderModel';

class OrderReplacementModel extends ServiceModel {

    /**
     * Service path for order replacements.
     */
    public static readonly servicePath = '/shop/order/replacements';

    /**
     * A replacement belongs to an order.
     */
    public get order() {
        return this.belongsTo<typeof OrderModel>('OrderModel', this.orderId);
    }

}

interface OrderReplacementModel extends OrderFeedbackDocument {
    entry: OrderFeedbackDocument;
}

export default OrderReplacementModel;
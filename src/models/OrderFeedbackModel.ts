import ServiceModel from '../providers/ServiceModel';
import OrderModel from './OrderModel';
import OrderFeedbackDocument from '../interfaces/OrderFeedbackDocument';

interface OrderFeedbackModel extends OrderFeedbackDocument {
    entry: OrderFeedbackDocument;
}

class OrderFeedbackModel extends ServiceModel {

    /**
     * Order Feedback Model service path.
     */
    public static readonly servicePath = '/shop/order/feedback';

    /**
     * Order feedback belongs to an order.
     */
    public get order() {
        return this.belongsTo<OrderModel>('OrderModel', this.orderId);
    }

}

export default OrderFeedbackModel;
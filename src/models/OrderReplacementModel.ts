import ServiceModel from '../providers/ServiceModel';
import OrderFeedbackDocument from '../interfaces/OrderFeedbackDocument';

class OrderReplacementModel extends ServiceModel {

    /**
     * Service path for order replacements.
     */
    public static readonly servicePath = '/shop/order/replacements';

}

interface OrderReplacementModel extends OrderFeedbackDocument {
    entry: OrderFeedbackDocument;
}

export default OrderReplacementModel;
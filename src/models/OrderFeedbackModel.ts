import ServiceModel from '../providers/ServiceModel';
import OrderFeedbackDocument from '../interfaces/documents/OrderFeedbackDocument';
import { ModelTimestamps } from '../interfaces/documents/ModelDocument';

class OrderFeedbackModel extends ServiceModel {

    /**
     * Order Feedback Model service path.
     */
    public static readonly servicePath = '/shop/order/feedback';

    /**
     * Order feedback belongs to an order.
     */
    public get order() {
        return this.belongsTo('OrderModel', this.orderId);
    }

    /**
     * Order feedback belongs to a product.
     */
    public get product() {
        return this.belongsTo('ProductModel', this.productId);
    }

    /**
     * Fetch the rating for one or more products.
     */
    public static async rating(productIds: string[]) {
        const feedback = await this.find({
            productId: {
                $in: productIds
            },
            $limit: -1,
        }).fetch();

        const ratings: number[] = feedback.data.map((feedback) => feedback.positive ? 1 : 0);
        let sum = 0;

        if (ratings.length) {
            sum = ratings.reduce((previous, current) => previous + current);
        }

        return {
            count: ratings.length,
            score: Math.round((sum / ratings.length) * 100) || -1,
        }
    }

}

interface OrderFeedbackModel extends Omit<OrderFeedbackDocument, ModelTimestamps> {
    entry: OrderFeedbackDocument;
}

export default OrderFeedbackModel;
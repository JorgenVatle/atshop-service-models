import ServiceModel from '../providers/ServiceModel';
import OrderDocument from '../interfaces/OrderDocument';

interface OrderModel extends OrderDocument {
    entry: OrderDocument;
}

class OrderModel extends ServiceModel {

    /**
     * Order Model service path.
     */
    public static readonly servicePath = '/shop/orders';

}
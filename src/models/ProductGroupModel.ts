import FeedbackSummary from '../interfaces/FeedbackSummary';
import ServiceModel from '../providers/ServiceModel';
import { ProductInterface } from '../interfaces/ProductInterface';
import ProductGroupDocument from '../interfaces/ProductGroupDocument';

class ProductGroupModel extends ServiceModel implements FeedbackSummary, ProductInterface {

    /**
     * Product groups service path.
     */
    public static readonly servicePath = '/shop/product/groups';


}

interface ProductModel extends ProductGroupDocument {
    entry: ProductGroupDocument;
}


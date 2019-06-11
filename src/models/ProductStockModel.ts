import ServiceModel from '../providers/ServiceModel';
import ProductStockDocument from '../interfaces/ProductStockDocument';

interface ProductStockModel extends Omit<ProductStockDocument, 'entry'> {
    entry: ProductStockDocument;
}

class ProductStockModel extends ServiceModel<ProductStockDocument> {

    /**
     * Service path for Product Stock Model
     */
    public static readonly servicePath = '/shop/product/stock'

}

export default ProductStockModel;
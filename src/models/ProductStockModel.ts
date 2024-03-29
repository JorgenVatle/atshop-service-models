import ServiceModel from '../providers/ServiceModel';
import ProductStockDocument from '../interfaces/documents/ProductStockDocument';
import { Omit } from '../utility/TS';
import { ModelTimestamps } from '../interfaces/documents/ModelDocument';

class ProductStockModel extends ServiceModel {

    /**
     * Service path for Product Stock Model
     */
    public static readonly servicePath = '/shop/product/stock'

}

interface ProductStockModel extends Omit<ProductStockDocument, 'entry' | ModelTimestamps> {
    entry: ProductStockDocument;
}

export default ProductStockModel;
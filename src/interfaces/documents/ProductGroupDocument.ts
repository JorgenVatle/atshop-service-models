import ProductDocumentInterface from './ProductDocumentInterface';
import ProductDocument from './ProductDocument';

export default interface ProductGroupDocument extends ProductDocumentInterface {

    /**
     * Product type.
     */
    type: 'group';

    /**
     * List of product IDs attached to this group.
     */
    productIds: string[];

    /**
     * ProductGroups belong to many Products.
     */
    _belongsToMany?: {
        '/shop/products': ProductDocument[],
    }

}
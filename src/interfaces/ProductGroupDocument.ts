import ProductDocumentInterface from './ProductDocumentInterface';

export default interface ProductGroupDocument extends ProductDocumentInterface {

    /**
     * Product type.
     */
    type: 'group';

    /**
     * List of product IDs attached to this group.
     */
    productIds: string[];

}
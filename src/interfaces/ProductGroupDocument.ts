import ProductInterface from './ProductInterface';

export default interface ProductGroupDocument extends ProductInterface {

    /**
     * Product type.
     */
    type: 'group';

    /**
     * List of product IDs attached to this group.
     */
    productIds: string[];
    
}
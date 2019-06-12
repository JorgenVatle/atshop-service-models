import ModelDocument from './ModelDocument';

export default interface ProductStockDocument extends ModelDocument {

    /**
     * String that is given to the customer on payment completion.
     */
    entry: string;

}
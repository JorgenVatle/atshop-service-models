import ModelDocument from './ModelDocument';

export default interface CustomerBlacklistDocument extends ModelDocument {
    /**
     * ID of the shop this customer is blacklisted in.
     */
    shopId: string;

    /**
     * Blacklisted customer email address.
     */
    email: string;
}
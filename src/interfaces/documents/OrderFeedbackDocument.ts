import ModelDocument from './ModelDocument';

export type FeedbackRating = 'satisfied' | 'dissatisfied'

export default interface OrderFeedbackDocument extends ModelDocument {
    /**
     * Customer provided feedback.
     */
    feedback: {
        /**
         * Customer message
         * @note optional
         */
        message: string;

        /**
         * Whether the user was satisfied or dissatisfied with the order.
         */
        rating: 'satisfied' | 'dissatisfied';
    }

    /**
     * ID of the order this feedback belongs to.
     */
    orderId: string;

    /**
     * ID of the product ordered.
     */
    productId: string;
}
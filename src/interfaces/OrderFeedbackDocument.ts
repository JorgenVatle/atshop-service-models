import ModelDocument from './ModelDocument';

export default interface OrderFeedbackDocument extends ModelDocument {
    feedback: {
        message: string;
        rating: 'satisfied' | 'dissatisfied';
    }
    orderId: string;
    productId: string;
}
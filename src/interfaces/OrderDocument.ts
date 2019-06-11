import ModelDocument from './ModelDocument';
import { CurrencyCode } from '../utility/AvailableCurrencies';

export default interface OrderDocument extends ModelDocument {
    productId: string;
    quantity: number;
    email: string;
    shopId: string;
    paid: boolean;
    paidAt: Date;
    secret: string;
    status: string;
    ipnId: string;
    currency: CurrencyCode;
    discardReason: string;
    fulfilled: boolean,
}
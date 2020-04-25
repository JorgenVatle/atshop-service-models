import ModelDocument from './ModelDocument';

/**
 * Available payment gateways.
 */
export type PaymentGateway = 'paypal' | 'coinpayments' | 'xsolla' | 'g2apay' | 'coinbase-commerce' | 'lex-payments';

export interface GatewayBaseDocument extends ModelDocument {
    /**
     * Name of the payment gateway.
     */
    name: PaymentGateway;

    /**
     * Whether or not this payment gateway is enabled.
     */
    enabled: boolean;

    /**
     * ID of the shop these gateway settings belong to.
     */
    shopId: string;
}

export interface XsollaCredentials extends GatewayBaseDocument {
    name: 'xsolla';
    merchantId: number;
    projectId: number;
    apiKey: string;
}

export interface PayPalCredentials extends GatewayBaseDocument {
    name: 'paypal';
    email: string;
}

export interface CoinPaymentsCredentials extends GatewayBaseDocument {
    name: 'coinpayments';
    merchantId: string;
    secret: string;
}

export interface CoinbaseCommerceCredentials extends GatewayBaseDocument {
    name: 'coinbase-commerce';
    apiKey: string;
    sharedSecret: string;
}

export interface LexPaymentsCredentials extends GatewayBaseDocument {
    name: 'lex-payments';
    apiKey: string;
}

export enum HumanGatewayName {
    'coinbase-commerce' = 'Coinbase Commerce',
    'g2apay' = 'G2A PAY',
    'coinpayments' = 'CoinPayments',
    'paypal' = 'PayPal',
    'xsolla' = 'Xsolla',
    'lex-payments' = 'Lex Payments',
}

export type GatewayDocument = CoinPaymentsCredentials | PayPalCredentials | XsollaCredentials | CoinbaseCommerceCredentials | LexPaymentsCredentials;
export default GatewayDocument;
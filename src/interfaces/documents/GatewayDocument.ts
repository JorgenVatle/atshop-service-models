import ModelDocument from './ModelDocument';

/**
 * Names of all available gateways.
 */
export type PaymentGateway = keyof PaymentGatewayConfigurations;

/**
 * Base model document for a gateway.
 */
export interface GatewayBaseDocument<T extends PaymentGateway> extends ModelDocument {
    /**
     * Name of the payment gateway.
     */
    name: T;

    /**
     * Whether or not this payment gateway is enabled.
     */
    enabled: boolean;

    /**
     * Pricing multiplier for orders paid through this gateway.
     */
    multiplier?: number;

    /**
     * ID of the shop these gateway settings belong to.
     */
    shopId: string;
}

/**
 * All available configuration properties for the provided gateway.
 */
export type GatewayConfiguration<
    GatewayName extends PaymentGateway = PaymentGateway
> = PaymentGatewayConfigurations[GatewayName];

/**
 * Gateway document for the provided gateway.
 */
export type GatewayDocument<
    GatewayName extends PaymentGateway = PaymentGateway
> = GatewayBaseDocument<GatewayName> & GatewayConfiguration<GatewayName>

/**
 * Gateway names for human consumption.
 * Used when rendering a gateway's name to a customer or administrator.
 */
export enum HumanGatewayName {
    'coinbase-commerce' = 'Coinbase Commerce',
    'g2apay' = 'G2A PAY',
    'coinpayments' = 'CoinPayments',
    'paypal' = 'PayPal',
    'xsolla' = 'Xsolla',
    'lex-payments' = 'Lex Payments',
    'cash-payments' = 'Cash Payments',
    'stripe' = 'Stripe',
    'yoomoney' = 'YooMoney',
    'flutterwave' = 'FlutterWave',
    'authorize.net' = 'Authorize.net',
    'paydash' = 'PayDash',
    'crypto-payments' = 'Crypto Payments',
}

export type CryptoCurrency =
    | 'btc' | 'ltc' | 'eth' | 'usdc';

/**
 * All available payment gateways and their respective configurations.
 */
export interface PaymentGatewayConfigurations {
    xsolla: {
        merchantId: number;
        projectId: number;
        apiKey: string;
    },
    paypal: {
        email: string;
    }
    coinpayments: {
        merchantId: string;
        secret: string;
    }
    'coinbase-commerce': {
        apiKey: string;
        sharedSecret: string;
    }
    'lex-payments': {
        apiKey: string;
    }
    'cash-payments': {
        secret: string;
        cashCode: string;
    }
    stripe: {
        publishableKey: string;
        secretKey: string;
        paymentMethodTypes?: Array<'alipay' | 'bacs_debit' | 'bancontact' | 'card' | 'eps' | 'fpx' | 'giropay' | 'grabpay' | 'ideal' | 'p24' | 'sepa_debit' | 'sofort'>,
    }
    yoomoney: {
        secret: string;
        walletId: string;
    }
    flutterwave: {
        secret: string;
        secretHash: string;
    }
    'authorize.net': {
        apiLoginId: string;
        transactionKey: string;
        signatureKey: string;
    }
    paydash: {
        apiKey: string;
    },
    'crypto-payments': Record<CryptoCurrency, string> & {
        userId?: string;
        payoutPreference?: string;
    }
    'non-implemented-gateway': unknown;
}

export default GatewayDocument;
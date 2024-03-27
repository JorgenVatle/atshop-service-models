import ModelDocument from './ModelDocument';

/**
 * Names of all available gateways.
 */
export type PaymentGateway = keyof PaymentGatewayConfigurations;

/**
 * Base model document for a gateway.
 */
export interface GatewayBaseDocument<TName extends PaymentGateway> extends ModelDocument {
    /**
     * Name of the payment gateway.
     */
    name: TName;

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
> = GatewayDocumentV1<GatewayName> | GatewayDocumentV2<GatewayName>;

/**
 * Legacy gateway configuration format
 * All settings would be stored in a flat document.
 */
type GatewayDocumentV1<
    TName extends PaymentGateway = PaymentGateway
> = GatewayBaseDocument<TName> & GatewayConfiguration<TName>

/**
 * New gateway configuration format
 * Any gateway-specific settings are kept under a 'config' property
 * Common settings like the price multiplier and shopId are stored at the root of the document.
 */
type GatewayDocumentV2<
    TName extends PaymentGateway = PaymentGateway
> = GatewayBaseDocument<TName> & {
    version: 2;
    config: GatewayConfiguration<TName>;
}

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

const GatewaySpecification: {
    [key in PaymentGateway]: {
        // Official name of the payment gateway. E.g. PayPal, Coinbase Commerce, G2A PAY
        humanName: string;
    }
} = {
    'coinbase-commerce': {
        humanName: 'Coinbase Commerce'
    },
    'g2apay': {
        humanName: 'G2A PAY'
    },
    'coinpayments': {
        humanName: 'CoinPayments'
    },
    'paypal': {
        humanName: 'PayPal'
    },
    'xsolla': {
        humanName: 'Xsolla'
    },
    'lex-payments': {
        humanName: 'Lex Payments'
    },
    'cash-payments': {
        humanName: 'Cash Payments'
    },
    'stripe': {
        humanName: 'Stripe'
    },
    'yoomoney': {
        humanName: 'YooMoney'
    },
    'flutterwave': {
        humanName: 'FlutterWave'
    },
    'authorize.net': {
        humanName: 'Authorize.net'
    },
    'paydash': {
        humanName: 'PayDash'
    },
    'crypto-payments': {
        humanName: 'Crypto Payments'
    },
    'non-implemented-gateway': {
        humanName: 'Non-implemented payment gateway',
    }
}

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
    g2apay: {
        merchantEmail: string;
        apiHash: string;
        apiSecret: string;
    }
    'crypto-payments': CryptoPaymentsConfigV2 | CryptoPaymentsConfigV1;
    'non-implemented-gateway': unknown;
}

type CryptoPaymentsConfigBase = {
    userId?: string;
    payoutPreference?: string;
}

type CryptoPaymentsConfigV1 = Record<CryptoCurrency, string> & CryptoPaymentsConfigBase;
type CryptoPaymentsConfigV2 = CryptoPaymentsConfigBase & {
    addresses: Record<CryptoCurrency, string>;
}

export default GatewayDocument;
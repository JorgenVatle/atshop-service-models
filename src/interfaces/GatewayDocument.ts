import ModelDocument from './ModelDocument';

/**
 * Available payment gateways.
 */
export type PaymentGateway = 'paypal' | 'coinpayments' | 'xsolla' | 'g2apay' | 'coinbase-commerce';

export default interface GatewayDocument extends ModelDocument {
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
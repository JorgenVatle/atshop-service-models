import ServiceModel from '../providers/ServiceModel';
import GatewayDocument, { GatewayBaseDocument, PaymentGateway } from '../interfaces/GatewayDocument';
import { ModelTimestamps } from '../interfaces/ModelDocument';
import { startCase } from 'lodash';

class GatewayModel<Credentials extends GatewayDocument = GatewayDocument> extends ServiceModel {

    /**
     * Gateway Model service path.
     */
    public static readonly servicePath = '/shop/gateways';

    /**
     * Gateway credentials.
     */
    public get credentials() {
        const { enabled, name, _id, createdAt, updatedAt, deletedAt, shopId, ...credentials } = <Credentials>this.entry;

        return credentials;
    }

    /**
     * A gateway belongs to a shop.
     */
    public get shop() {
        return this.belongsTo('ShopModel', this.shopId);
    }

    /**
     * Humanize a payment gateway name.
     */
    public static humanizeName(name: PaymentGateway | undefined) {
        switch (name) {
            case 'coinbase-commerce':
                return 'Coinbase Commerce';
            case 'g2apay':
                return 'G2A PAY';
            case 'coinpayments':
                return 'CoinPayments';
            case 'paypal':
                return 'PayPal';
            case 'xsolla':
                return 'Xsolla';
            default:
                return name ? startCase(name) : 'N/A';
        }
    }

}

interface GatewayModel<Credentials extends GatewayDocument = GatewayDocument> extends Omit<GatewayBaseDocument, ModelTimestamps> {
    entry: GatewayDocument;
}

export default GatewayModel;
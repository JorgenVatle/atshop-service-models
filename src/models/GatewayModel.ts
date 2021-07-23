import ServiceModel from '../providers/ServiceModel';
import GatewayDocument, { GatewayBaseDocument, HumanGatewayName, PaymentGateway } from '../interfaces/GatewayDocument';
import { ModelTimestamps } from '../interfaces/ModelDocument';
import { startCase } from 'lodash';

class GatewayModel<GatewayName extends PaymentGateway> extends ServiceModel {

    /**
     * Gateway Model service path.
     */
    public static readonly servicePath = '/shop/gateways';

    /**
     * Gateway credentials.
     */
    public get credentials() {
        const { enabled, name, _id, createdAt, updatedAt, deletedAt, shopId, ...credentials } = this.entry;

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
        if (!name) {
            return 'N/A';
        }

        return HumanGatewayName[name] || startCase(name);
    }

}

interface GatewayModel<GatewayName extends PaymentGateway> extends Omit<GatewayBaseDocument<GatewayName>, ModelTimestamps> {
    entry: GatewayDocument<GatewayName>;
}

export default GatewayModel;
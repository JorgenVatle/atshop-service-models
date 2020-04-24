import ServiceModel from '../providers/ServiceModel';
import GatewayDocument, { GatewayBaseDocument, HumanGatewayName, PaymentGateway } from '../interfaces/GatewayDocument';
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
        if (!name) {
            return 'N/A';
        }

        const humanGatewayName = HumanGatewayName[name];

        return humanGatewayName || startCase(name);
    }

}

interface GatewayModel<Credentials extends GatewayDocument = GatewayDocument> extends Omit<GatewayBaseDocument, ModelTimestamps> {
    entry: GatewayDocument;
}

export default GatewayModel;
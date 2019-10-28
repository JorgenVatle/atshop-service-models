import ServiceModel from '../providers/ServiceModel';
import GatewayDocument, { GatewayBaseDocument } from '../interfaces/GatewayDocument';
import { ModelTimestamps } from '../interfaces/ModelDocument';

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

}

interface GatewayModel<Credentials extends GatewayDocument = GatewayDocument> extends Omit<GatewayDocument, ModelTimestamps> {
    entry: GatewayDocument;
}

export default GatewayModel;
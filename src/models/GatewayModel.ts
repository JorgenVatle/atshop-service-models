import ServiceModel from '../providers/ServiceModel';
import GatewayDocument, { GatewayBaseDocument } from '../interfaces/GatewayDocument';

class GatewayModel extends ServiceModel {

    /**
     * Gateway Model service path.
     */
    public static readonly servicePath = '/shop/gateways';

    /**
     * Gateway credentials.
     */
    public get credentials() {
        const { enabled, name, _id, createdAt, updatedAt, ...credentials } = this.entry;

        return credentials;
    }

    /**
     * A gateway belongs to a shop.
     */
    public get shop() {
        return this.belongsTo('ShopModel', this.shopId);
    }

}

interface GatewayModel extends GatewayBaseDocument {
    entry: GatewayDocument;
}

export default GatewayModel;
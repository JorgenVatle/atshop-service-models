import ServiceModel from '../providers/ServiceModel';
import GatewayDocument from '../interfaces/GatewayDocument';

class GatewayModel extends ServiceModel {

    /**
     * Gateway Model service path.
     */
    public static readonly servicePath = '/shop/gateways';

    /**
     * A gateway belongs to a shop.
     */
    public get shop() {
        return this.belongsTo('ShopModel', this.shopId);
    }

}

interface GatewayModel extends GatewayDocument {
    entry: GatewayDocument;
}

export default GatewayModel;
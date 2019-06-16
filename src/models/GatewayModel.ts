import ServiceModel from '../providers/ServiceModel';
import GatewayDocument from '../interfaces/GatewayDocument';

interface GatewayModel extends GatewayDocument {
    entry: GatewayDocument;
}

class GatewayModel extends ServiceModel {

    /**
     * Gateway Model service path.
     */
    public static readonly servicePath = '/shop/gateways';

}

export default GatewayModel;
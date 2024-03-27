import { startCase } from 'lodash';
import GatewayDocument, {
    GatewayBaseDocument,
    type GatewayConfiguration,
    GatewaySpecification,
    PaymentGateway,
} from '../interfaces/documents/GatewayDocument';
import { ModelTimestamps } from '../interfaces/documents/ModelDocument';
import ServiceModel from '../providers/ServiceModel';

class GatewayModel<
    GatewayName extends PaymentGateway = PaymentGateway
> extends ServiceModel {

    /**
     * Gateway Model service path.
     */
    public static readonly servicePath = '/shop/gateways';
    
    /**
     * Gateway credentials.
     */
    public get credentials(): GatewayConfiguration<GatewayName> {
        if (this.isConfigV2()) {
            return this.entry.config;
        }
        
        // Gateway configuration (v1)
        const { enabled, name, _id, createdAt, updatedAt, deletedAt, shopId, multiplier, __v, ...credentials } = this.entry;

        return credentials as GatewayConfiguration<GatewayName>;
    }
    
    protected isConfigV2(): this is { entry: { version: 'v2', config: GatewayConfiguration<GatewayName, 'v2'> } } {
        if ('version' in this.entry) {
            return this.entry.version === 'v2';
        }
        if ('config' in this.entry) {
            return true;
        }
        return false;
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
    public static humanizeName(name?: PaymentGateway) {
        if (!name) {
            return 'N/A';
        }
        
        if (name in GatewaySpecification) {
            return GatewaySpecification[name].humanName;
        }
        
        return startCase(name);
    }
}

interface GatewayModel<GatewayName extends PaymentGateway> extends Omit<GatewayBaseDocument<GatewayName>, ModelTimestamps> {
    entry: GatewayDocument<GatewayName>;
}

export default GatewayModel;
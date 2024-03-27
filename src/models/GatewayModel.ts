import { omit, startCase } from 'lodash';
import GatewayDocument, {
    GatewayBaseDocument,
    type GatewayConfiguration,
    type GatewayConfigVersion,
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
        if (this.is({ version: 'v2' })) {
            return this.entry.config;
        }
        
        // Gateway configuration (v1)
        const { enabled, name, _id, createdAt, updatedAt, deletedAt, shopId, multiplier, __v, ...credentials } = this.entry;

        return credentials as GatewayConfiguration<GatewayName>;
    }
    
    public is<
        TVersion extends GatewayConfigVersion,
        TName extends PaymentGateway = GatewayName
    >({ version, name = this.name as any }: { version: TVersion, name?: TName }): this is { entry: GatewayDocument<TName, TVersion> } {
        // @ts-expect-error The name entry prop is too wide for this to not emit an error.
        if (this.entry.name !== name) {
            return false;
        }
        if ('config' in this.entry) {
            return version === 'v2';
        }
        if ('version' in this.entry) {
            return this.entry.version === version;
        }
        return true;
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
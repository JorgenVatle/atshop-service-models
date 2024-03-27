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
        
        return omitGatewayV1RootFields(this.entry) as GatewayConfiguration<GatewayName, 'v1'>;
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

const GATEWAY_V1_ROOT_FIELDS = [
    '__v',
    '_id',
    'name',
    'shopId',
    'enabled',
    'multiplier',
    'createdAt',
    'updatedAt',
    'deletedAt',
] satisfies (keyof GatewayDocument | 'config')[];
type GatewayV1RootField = typeof GATEWAY_V1_ROOT_FIELDS[number];

function omitGatewayV1RootFields<TDocument extends GatewayDocument>(document: TDocument): Omit<TDocument, GatewayV1RootField> {
    return omit(document, GATEWAY_V1_ROOT_FIELDS);
}

interface GatewayModel<GatewayName extends PaymentGateway> extends Omit<GatewayBaseDocument<GatewayName>, ModelTimestamps> {
    entry: GatewayDocument<GatewayName>;
}

export default GatewayModel;
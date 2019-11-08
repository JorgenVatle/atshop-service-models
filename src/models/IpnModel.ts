import ServiceModel from '../providers/ServiceModel';
import IpnDocument from '../interfaces/IpnDocument';
import { ModelTimestamps } from '../interfaces/ModelDocument';
import GatewayModel from './GatewayModel';

class IpnModel extends ServiceModel {

    /**
     * Ipn Model service path.
     */
    public static readonly servicePath = '/shop/ipn';

    /**
     * Human friendly name for the payment gateway associated with this IPN.
     */
    public get humanName() {
        return GatewayModel.humanizeName(this.gateway);
    }

}

interface IpnModel extends Omit<IpnDocument, ModelTimestamps> {
    entry: IpnDocument;
}

export default IpnModel;
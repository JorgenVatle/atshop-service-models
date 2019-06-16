import ServiceModel from '../providers/ServiceModel';
import { startCase } from 'lodash';
import IpnDocument from '../interfaces/IpnDocument';

class IpnModel extends ServiceModel {

    /**
     * Ipn Model service path.
     */
    public static readonly servicePath = '/shop/ipn';

    /**
     * Human friendly name for the payment gateway associated with this IPN.
     */
    public get humanName() {
        return startCase(this.gateway);
    }

}

interface IpnModel extends IpnDocument{
    entry: IpnDocument;
}

export default IpnModel;
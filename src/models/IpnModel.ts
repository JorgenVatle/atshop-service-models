import ServiceModel from '../providers/ServiceModel';
import IpnDocument from '../interfaces/IpnDocument';

class IpnModel extends ServiceModel {

    /**
     * Ipn Model service path.
     */
    public static readonly servicePath = '/shop/ipn';

}

interface IpnModel extends IpnDocument{
    entry: IpnDocument;
}

export default IpnModel;
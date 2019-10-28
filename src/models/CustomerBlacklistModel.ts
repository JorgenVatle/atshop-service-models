import ServiceModel from '../providers/ServiceModel';
import CustomerBlacklistDocument from '../interfaces/CustomerBlacklistDocument';
import { ModelTimestamps } from '../interfaces/ModelDocument';

class CustomerBlacklistModel extends ServiceModel {

    /**
     * Service path for Customer Blacklist Model.
     */
    public static readonly servicePath = '/shop/blacklist';

}

interface CustomerBlacklistModel extends Omit<CustomerBlacklistDocument, ModelTimestamps> {
    entry: CustomerBlacklistDocument;
}
export default CustomerBlacklistModel;
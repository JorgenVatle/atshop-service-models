import ServiceModel from '../providers/ServiceModel';
import CustomerBlacklistDocument from '../interfaces/CustomerBlacklistDocument';

interface CustomerBlacklistModel extends CustomerBlacklistDocument {
    entry: CustomerBlacklistDocument;
}

class CustomerBlacklistModel extends ServiceModel {

    /**
     * Service path for Customer Blacklist Model.
     */
    public static readonly servicePath = '/shop/blacklist';

}

export default CustomerBlacklistModel;
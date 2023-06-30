import ServiceModel from '../providers/ServiceModel';
import { UserDocument } from '../interfaces/documents/UserDocument';
import { ModelTimestamps } from '../interfaces/documents/ModelDocument';

class UserModel extends ServiceModel {

    /**
     * User Model service path.
     */
    public static readonly servicePath = '/users';

}

interface UserModel extends Omit<UserDocument, ModelTimestamps> {
    entry: UserDocument;
}

export default UserModel;
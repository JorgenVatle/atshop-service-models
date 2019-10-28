import ServiceModel from '../providers/ServiceModel';
import { UserDocument } from '../interfaces/UserDocument';
import { ModelTimestamps } from '../interfaces/ModelDocument';

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
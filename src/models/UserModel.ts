import ServiceModel from '../providers/ServiceModel';
import { UserDocument } from '../interfaces/UserDocument';

class UserModel extends ServiceModel {

    /**
     * User Model service path.
     */
    public static readonly servicePath = '/users';

}

interface UserModel extends UserDocument {
    entry: UserDocument;
}

export default UserModel;
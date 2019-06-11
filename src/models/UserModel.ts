import ServiceModel from '../providers/ServiceModel';
import { UserDocument } from '../interfaces/UserDocument';

interface UserModel extends UserDocument {
    entry: UserDocument;
}

class UserModel extends ServiceModel {

    /**
     * User Model service path.
     */
    public static readonly servicePath = '/users';

}

export default UserModel;
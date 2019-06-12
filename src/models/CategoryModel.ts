import ServiceModel from '../providers/ServiceModel';
import CategoryDocument from '../interfaces/CategoryDocument';

interface CategoryModel extends CategoryDocument {
    entry: CategoryDocument;
}

class CategoryModel extends ServiceModel {

    /**
     * Service path for Category Model.
     */
    public static readonly servicePath = '/shop/categories';

}

export default CategoryModel;
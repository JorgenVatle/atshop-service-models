import ServiceModel from '../providers/ServiceModel';
import CategoryDocument from '../interfaces/CategoryDocument';
import ShopModel from './ShopModel';

interface CategoryModel extends CategoryDocument {
    entry: CategoryDocument;
}

class CategoryModel extends ServiceModel {

    /**
     * Service path for Category Model.
     */
    public static readonly servicePath = '/shop/categories';

    /**
     * A category belongs to a shop.
     */
    public get shop(): Promise<ShopModel> {
        return this.belongsTo('ShopModel', this.shopId);
    }

}

export default CategoryModel;
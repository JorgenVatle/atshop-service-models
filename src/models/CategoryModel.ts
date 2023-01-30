import ServiceModel from '../providers/ServiceModel';
import CategoryDocument from '../interfaces/documents/CategoryDocument';
import ShopModel from './ShopModel';
import { ModelTimestamps } from '../interfaces/documents/ModelDocument';

class CategoryModel extends ServiceModel {

    /**
     * Service path for Category Model.
     */
    public static readonly servicePath = '/shop/categories';

    /**
     * A category belongs to a shop.
     */
    public get shop(): Promise<ShopModel> {
        return this.belongsTo<typeof ShopModel>('ShopModel', this.shopId);
    }

    /**
     * Whether or not the given path matches this category's slug.
     */
    public matchesPath(path: string) {
        return path.replace(/^\/+/, '') === this.slug;
    }
}

interface CategoryModel extends Omit<CategoryDocument, ModelTimestamps> {
    entry: CategoryDocument;
}

export default CategoryModel;
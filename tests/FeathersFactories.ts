import FeathersFactory from 'feathers-factory';
import { Application } from '@feathersjs/feathers';
import Faker from 'faker';
import CategoryModel from '../src/models/CategoryModel';
import ShopModel from '../src/models/ShopModel';

export default (app: Application) => {
    FeathersFactory.define('shop', ShopModel.service, {
        _id: Faker.random.alphaNumeric(),
    });

    FeathersFactory.define('category', CategoryModel.service, {
        title: Faker.commerce.department,
        async shopId() {
            return (await FeathersFactory.create('shop'))._id;
        },
        async slug() {
            return Faker.helpers.slugify(await this.title);
        }
    });
}
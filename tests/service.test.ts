import { SetupServiceModels } from '../src';
import Client from './FeathersClient';
import ShopModel from '../src/models/ShopModel';
import ProductModel from '../src/models/ProductModel';

SetupServiceModels({
    app: Client,
});

/**
 * Always available sandbox test shop.
 */
let testShop: ShopModel;
beforeAll(async () => {
    testShop = await ShopModel.get('ZBAWZE4LzB4RoguGY')
});

describe('ShopModel', () => {
    test('can get() a shop by ID', async () => {
        await expect(ShopModel.get(testShop._id)).resolves.toBeDefined();
    });

    test('can find() a shop by domain', async () => {
        const shops = await ShopModel.find({ domain: testShop.domain }).fetch();
        expect(shops.total).toBeGreaterThan(0);
    });

    test('has many products', async () => {
        const products = await testShop.products.fetch();
        expect(products.total).toBeDefined();
        expect(products.data[0]).toBeInstanceOf(ProductModel);
    });
});

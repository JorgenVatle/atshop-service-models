import Client from './FeathersClient';
import ShopModel from '../src/models/ShopModel';
import ProductModel from '../src/models/ProductModel';
import { Forbidden } from '@feathersjs/errors';
import { ATShopServiceModels } from '../src';

/**
 * Always available sandbox test shop.
 */
let testShop: ShopModel;
beforeAll(async () => {
    testShop = await ShopModel.get('ZBAWZE4LzB4RoguGY')
});

test('Can override service models', async () => {
    class ProductModelOverride extends ProductModel {
        customMethod() {
            return true;
        }
    }

    Client.configure(ATShopServiceModels({
        models: {
            ProductModel: ProductModelOverride,
        }
    }));

    const testProduct = <ProductModelOverride>await testShop.products.fetchOne();

    expect(testProduct).toBeInstanceOf(ProductModelOverride);
    expect(testProduct.customMethod()).toBe(true);
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
        expect(products.total).toBeGreaterThan(0);
        expect(products.data[0]).toBeInstanceOf(ProductModel);
    });

    test('can build URLs to self', () => {
        expect(testShop.urlTo('/test')).toEqual('https://test-shop.atshop.io/test');
    });

    describe('unauthorized users', () => {
        test('cannot fetch the blacklist', async () => {
            await expect(testShop.blacklist.fetch()).rejects.toBeInstanceOf(Forbidden);
        });
    });

});

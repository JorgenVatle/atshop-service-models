import Client from './FeathersClient';
import ShopModel from '../src/models/ShopModel';
import ProductModel from '../src/models/ProductModel';
import { Forbidden } from '@feathersjs/errors';
import { ATShopServiceModels } from '../src';
import CategoryModel from '../src/models/CategoryModel';
import Factory from 'feathers-factory';
import OrderModel from '../src/models/OrderModel';

/**
 * Always available sandbox test shop.
 */
let testShop: ShopModel;
const orderIdWithFeedback = 'PF5HfQQAAqm2unQfr';

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

describe('CategoryModel', () => {
    it('can match paths', async () => {
        const category = new CategoryModel(<any>await Factory.get('category', {
            shopId: testShop._id,
            slug: 'test'
        }));

        expect(category.matchesPath('/test')).toBe(true);
    });
});

describe('OrderModel', () => {
    it('can get() using ID', async () => {
        await expect(OrderModel.get(orderIdWithFeedback)).resolves.toBeDefined();
    });

    it('can check for feedback', async () => {
        const order = await OrderModel.get(orderIdWithFeedback);

        expect(await order.hasFeedback).toBe(true);
        expect(await order.feedback).toBeTruthy();
    });
});
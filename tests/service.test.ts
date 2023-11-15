import Client from './FeathersClient';
import ShopModel from '../src/models/ShopModel';
import ProductModel from '../src/models/ProductModel';
import { Forbidden, NotFound } from '@feathersjs/errors';
import { ATShopServiceModels } from '../src';
import CategoryModel from '../src/models/CategoryModel';
import Factory from 'feathers-factory';
import OrderModel from '../src/models/OrderModel';

import { beforeAll, test, describe, expect, it } from 'vitest';

/**
 * Always available sandbox test shop.
 */
let testShop: ShopModel;
const orderIdWithFeedback = 'PF5HfQQAAqm2unQfr';
const orderIdWithoutFeedback = '1Uj86Cw0re3q';

describe('ShopModel', () => {
    beforeAll(async () => {
        testShop = await ShopModel.get('ZBAWZE4LzB4RoguGY')
    });
    
    test('Can be extended by another service model', async () => {
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

    test('can fetch raw (non-instantiated) products', async () => {
        const products = await testShop.products.fetchRaw();
        expect(products.total).toBeGreaterThan(0);
        expect(products.data[0]).not.toBeInstanceOf(ProductModel);
        expect(products.data[0]._id).toBeTruthy();
        expect(products.data[0].name).toBeTruthy();
    });

    test('can build URLs to self', () => {
        expect(testShop.urlTo('/test')).toEqual('https://test-shop.ats.gg/test');
    });

    it('can build legacy URLs', () => {
        expect(testShop.urlTo('/test', true)).toEqual('https://test-shop.atshop.io/test');
    });

    it('can build URLs using custom domains', async () => {
        const myShop = await ShopModel.get('ZBAWZE4LzB4RoguGY');
        myShop.entry.customDomain = 'example.com';

        expect(myShop.urlTo('/test')).toEqual('https://example.com/test');
        expect(myShop.urlTo('/test', true)).toEqual('https://example.com/test');
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
        const orderWithFeedback = await OrderModel.get(orderIdWithFeedback);
        const orderWithoutFeedback = await OrderModel.get(orderIdWithoutFeedback);

        expect(await orderWithFeedback.hasFeedback).toBe(true);
        expect(await orderWithoutFeedback.hasFeedback).toBeFalsy();
        expect(await orderWithFeedback.feedback).toBeTruthy();
        await expect(orderWithoutFeedback.feedback).rejects.toBeInstanceOf(NotFound);
    });
});
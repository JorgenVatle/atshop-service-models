import { SetupServiceModels } from '../src';
import Client from './FeathersClient';
import ShopModel from '../src/models/ShopModel';
import { NotFound } from '@feathersjs/errors';

class BaseModel  {
    static get testGetter() {
        return 'test';
    }
}

SetupServiceModels({
    app: Client,
});

describe('ShopModel', () => {
    test('can get() a shop by ID', async () => {
        await expect(ShopModel.get('ZBAWZE4LzB4RoguGY')).resolves.toBeDefined();
    });
});

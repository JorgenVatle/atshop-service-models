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

test('can interact with the Feathers server', async () => {
    await expect(ShopModel.get('some-id')).rejects.toBeInstanceOf(NotFound);
});
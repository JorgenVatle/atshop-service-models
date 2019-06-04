import { SetupServiceModels } from '../src';
import Client from './FeathersClient';
import ShopModel from '../src/models/ShopModel';

class BaseModel  {
    static get testGetter() {
        return 'test';
    }
}

test('can specify a custom BaseModel', () => {
     SetupServiceModels({
         app: Client,
         baseModel: BaseModel,
     });

     // @ts-ignore
     expect(ShopModel.testGetter).toBe('test');
});
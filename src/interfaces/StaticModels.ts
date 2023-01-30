import type OrderModel from '../models/OrderModel';
import type CategoryModel from '../models/CategoryModel';
import type CustomerBlacklistModel from '../models/CustomerBlacklistModel';
import type GatewayModel from '../models/GatewayModel';
import type IpnModel from '../models/IpnModel';
import type OrderEventModel from '../models/OrderEventModel';
import type ProductModel from '../models/ProductModel';
import type ProductStockModel from '../models/ProductStockModel';
import type ShopModel from '../models/ShopModel';
import type UserModel from '../models/UserModel';
import type OrderFeedbackModel from '../models/OrderFeedbackModel';
import type ProductGroupModel from '../models/ProductGroupModel';
import type OrderReplacementModel from '../models/OrderReplacementModel';
import type CouponModel from '../models/CouponModel';
import type ServiceModel from '../providers/ServiceModel';
import ModelDocument from './documents/ModelDocument';

export default interface StaticModels {
    readonly CategoryModel: typeof CategoryModel;
    readonly CustomerBlacklistModel: typeof CustomerBlacklistModel;
    readonly GatewayModel: typeof GatewayModel;
    readonly IpnModel: typeof IpnModel;
    readonly OrderEventModel: typeof OrderEventModel;
    readonly OrderFeedbackModel: typeof OrderFeedbackModel;
    readonly OrderModel: typeof OrderModel;
    readonly ProductModel: typeof ProductModel;
    readonly ProductStockModel: typeof ProductStockModel;
    readonly ShopModel: typeof ShopModel;
    readonly UserModel: typeof UserModel;
    readonly ProductGroupModel: typeof ProductGroupModel;
    readonly OrderReplacementModel: typeof OrderReplacementModel;
    readonly CouponModel: typeof CouponModel;
}

export type ModelName = keyof StaticModels;
type StaticServiceModel = typeof ServiceModel;

export interface StaticModel<Name extends ModelName = ModelName> extends StaticServiceModel {
    new(...document: ModelConstructor<Name>): ModelInstance<StaticModels[Name]>;
}

// TODO: This should be inferred.
// All models should adhere to the entry: ModelDocument interface.
export type ModelConstructor<Name extends ModelName> = [document: ModelDocument];

export type InferDocumentType<Model extends StaticModel> = InstanceType<Model>['entry'];

export type ModelInstance<Model extends StaticModel> = Model extends StaticModel<infer Name>
                                                       ? InstanceType<StaticModels[Name]>
                                                       : never;

export type InferStaticModel<ModelTypeof> = StaticModels extends {
    [key in ModelName]: infer Static
} ? Static extends ModelTypeof
   ? ModelTypeof
   : never
 : never;
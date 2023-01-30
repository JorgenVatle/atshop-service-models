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

export default interface StaticModels {
    CategoryModel: typeof CategoryModel;
    CustomerBlacklistModel: typeof CustomerBlacklistModel;
    GatewayModel: typeof GatewayModel;
    IpnModel: typeof IpnModel;
    OrderEventModel: typeof OrderEventModel;
    OrderFeedbackModel: typeof OrderFeedbackModel;
    OrderModel: typeof OrderModel;
    ProductModel: typeof ProductModel;
    ProductStockModel: typeof ProductStockModel;
    ShopModel: typeof ShopModel;
    UserModel: typeof UserModel;
    ProductGroupModel: typeof ProductGroupModel;
    OrderReplacementModel: typeof OrderReplacementModel;
    CouponModel: typeof CouponModel;
}

export type ModelName = keyof StaticModels;
export type StaticModel = StaticModels[ModelName];
export type InferDocumentType<Model extends typeof ServiceModel> = InstanceType<Model>['entry'];
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
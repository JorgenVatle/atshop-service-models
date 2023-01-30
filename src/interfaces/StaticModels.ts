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

/**
 * There are here for you to inject your own declarations into to ensure your
 * classes have the correct relational types.
 *
 * @example typescript
 * declare module 'atshop-service-models/src/interfaces/StaticModels' {
 *     export interface ExtendedModels {
 *         OrderModel: typeof MyExtendedOrderModel,
 *         ...
 *     }
 * }
 */
export interface ExtendedModels {

}

export interface DefaultModels {
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

type StaticModels = ExtendedModels & Omit<DefaultModels, keyof ExtendedModels>;

export type ModelName = keyof StaticModels;
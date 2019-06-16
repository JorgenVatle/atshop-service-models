import OrderModel from '../models/OrderModel';
import CategoryModel from '../models/CategoryModel';
import CustomerBlacklistModel from '../models/CustomerBlacklistModel';
import GatewayModel from '../models/GatewayModel';
import IpnModel from '../models/IpnModel';
import OrderEventModel from '../models/OrderEventModel';
import ProductModel from '../models/ProductModel';
import ProductStockModel from '../models/ProductStockModel';
import ShopModel from '../models/ShopModel';
import UserModel from '../models/UserModel';
import OrderFeedbackModel from '../models/OrderFeedbackModel';

export default interface Models {
    CategoryModel: typeof CategoryModel,
    CustomerBlacklistModel: typeof CustomerBlacklistModel,
    GatewayModel: typeof GatewayModel,
    IpnModel: typeof IpnModel,
    OrderEventModel: typeof OrderEventModel,
    OrderFeedbackModel: typeof OrderFeedbackModel,
    OrderModel: typeof OrderModel,
    ProductModel: typeof ProductModel,
    ProductStockModel: typeof ProductStockModel,
    ShopModel: typeof ShopModel,
    UserModel: typeof UserModel,
}